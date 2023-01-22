import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { from, map, Observable, tap } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(filters: FetchUsersFiltersDto): Observable<UserResource[]> {
    return from(this.usersRepository.findAll(filters));
  }

  create(user: CreateUserDto): Observable<UserResource> {
    return from(this.usersRepository.save(user)).pipe(
      map((user) => plainToClass(UserResource, user)),
    );
  }
}
