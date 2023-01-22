import { UpdateUserDto } from './models/update-user-dto';
import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
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

  @Get(":id")
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found', schema: { example: { statusCode: 404, message: 'Not found' } }})
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<UserResource> {
    return this.usersService.findOne(id);
  }
  
  @Post()
  @ApiCreatedResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(
    @Body() user: CreateUserDto,
  ): Observable<UserResource> {
    return this.usersService.create(user);
  }

  @Put()
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(
    @Body() user: UpdateUserDto,
  ): Observable<UserResource> {
    return this.usersService.update(user);
  }

  @Delete(":id")
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<UserResource> {
    return this.usersService.delete(id);
  }


}
