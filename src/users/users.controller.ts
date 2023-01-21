import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { User } from './entities/user.entity';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(
    @Query() filters: FetchUsersFiltersDto,
  ): Observable<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(
    @Body() user: CreateUserDto,
  ): Observable<User> {
    return this.usersService.create(user);
  }

}
