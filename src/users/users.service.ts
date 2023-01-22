import { LoginDto } from './models/login-dto';
import { LoginResponse } from './models/login-response';
import { AuthService } from './../auth/auth.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './models/update-user-dto';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { from, map, mergeMap, Observable, switchMap, tap } from 'rxjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  login(user: LoginDto): Observable<LoginResponse> {
    return this.findOneByEmail(user.email).pipe(
      mergeMap((user) =>
        from(this.authService.login(user)).pipe(
          map((token) => {
            return {
              access_token: token.access_token,
              user: plainToClass(UserResource, user),
            } as LoginResponse;
          }),
        ),
      ),
    );
  }

  findAll(filters: FetchUsersFiltersDto): Observable<UserResource[]> {
    return from(this.usersRepository.findAll(filters));
  }

  findOneByEmail(email: string): Observable<User> {
    return from(this.usersRepository.findOne({ where: { email } })).pipe(
      tap((user) => {
        if (!user) {
          throw new NotFoundException();
        }
      }),
    );
  }

  findOne(id: number): Observable<UserResource> {
    return from(this.usersRepository.findOne({ where: { id } })).pipe(
      tap((user) => {
        if (!user) {
          throw new NotFoundException();
        }
      }),
      map((user) => plainToClass(UserResource, user)),
    );
  }

  create(user: CreateUserDto): Observable<UserResource> {
    return from(this.usersRepository.save(user)).pipe(
      map((user) => plainToClass(UserResource, user)),
    );
  }

  update(user: UpdateUserDto): Observable<UserResource> {
    return from(this.findOne(user.id)).pipe(
      switchMap((_) => from(this.usersRepository.save(user))),
      map((user) => plainToClass(UserResource, user)),
    );
  }

  delete(id: number): Observable<UserResource> {
    return from(this.findOne(id)).pipe(
      switchMap((user) =>
        from(this.usersRepository.delete(id)).pipe(
          tap(() => console.log(user)),
          map(() => user),
        ),
      ),
      map((user) => plainToClass(UserResource, user)),
    );
  }
}
