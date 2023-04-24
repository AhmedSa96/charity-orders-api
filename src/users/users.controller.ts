import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateUserDto } from './models/update-user-dto';
import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { AdminGuard } from '../auth/admin.guard';
import { User as UserModel } from './entities/user.entity';
import { CurrentAuthUser } from 'src/auth/models/current-auth-user';
import { User } from '../shared/decorators/user.decorator';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserModel] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(
    @Query() filters: FetchUsersFiltersDto,
  ) {
    return await this.usersService.findAll(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get("orders")
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findOrders(
    @User() user: CurrentAuthUser,
  ) {
    return await this.usersService.findOrdersByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found', schema: { example: { statusCode: 404, message: 'Not found' } }})
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResource> {
    return await this.usersService.findOne(id);
  }
  
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Body() user: CreateUserDto,
  ): Promise<UserResource> {
    return await this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update(
    @Body() user: UpdateUserDto,
  ): Promise<UserResource> {
    return await this.usersService.update(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResource> {
    return await this.usersService.delete(id);
  }
}
