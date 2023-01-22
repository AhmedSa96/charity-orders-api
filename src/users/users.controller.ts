import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserResource] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll(
    @Query() filters: FetchUsersFiltersDto,
  ): Observable<UserResource[]> {
    return this.usersService.findAll(filters);
  }

  
  @Post()
  @ApiCreatedResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(
    @Body() user: CreateUserDto,
  ): Observable<UserResource> {
    return this.usersService.create(user);
  }

}
