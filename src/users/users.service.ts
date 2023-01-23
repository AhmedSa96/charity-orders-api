import { LoginDto } from './models/login-dto';
import { LoginResponse } from './models/login-response';
import { AuthService } from './../auth/auth.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './models/update-user-dto';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async login(user: LoginDto): Promise<LoginResponse> {
    const userEntity = await this.findOneByEmail(user.email);
    const token = await this.makeUserLogin(userEntity, user);

    return {
      access_token: token.access_token,
      user: plainToClass(UserResource, userEntity),
    } as LoginResponse;
  }

  async findAll(filters: FetchUsersFiltersDto): Promise<UserResource[]> {
    return await this.usersRepository.findAll(filters);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOne(id: number): Promise<UserResource> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(UserResource, user);
  }

  async create(user: CreateUserDto): Promise<UserResource> {
    const hash = await bcrypt.hash(user.password, 10);

    const savedUser = this.usersRepository.upsert({
      ...user,
      password: hash,
    }, { conflictPaths: ['id']  });

    return plainToClass(UserResource, savedUser);
  }

  async update(user: UpdateUserDto): Promise<UserResource> {
    await this.findOne(user.id);

    const newUser = await this.usersRepository.update(user.id, user);

    return plainToClass(UserResource, newUser);
  }

  async delete(id: number): Promise<UserResource> {
    const user = await this.findOne(id);

    await this.usersRepository.delete(id);

    return user;
  }

  private async makeUserLogin(
    user: User,
    login: LoginDto,
  ): Promise<{ access_token: string }> {
    const isPasswordMatch = await bcrypt.compare(login.password, user.password);
    if (!isPasswordMatch) {
      throw new NotFoundException();
    }

    return await this.authService.login(user);
  }
}
