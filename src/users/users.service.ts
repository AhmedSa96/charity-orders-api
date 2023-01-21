import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { User } from './entities/user.entity';
import { from, map, Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(filters: FetchUsersFiltersDto): Observable<User[]> {
    return from(this.usersRepository.findAll(filters));
  }

  create(user: CreateUserDto): Observable<User> {
    return from(this.usersRepository.save(user));
  }
}
