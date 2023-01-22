import { UpdateUserDto } from './models/update-user-dto';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(filters: FetchUsersFiltersDto): Observable<UserResource[]> {
    return from(this.usersRepository.findAll(filters));
  }

  findOne(id: number): Observable<UserResource> {
    return from(this.usersRepository.findOne({ where: { id }})).pipe(
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
      switchMap((user) => from(this.usersRepository.delete(id)).pipe(tap(() =>console.log(user)), map(() => user))),
      map((user) => plainToClass(UserResource, user)),
    );
  }
}
