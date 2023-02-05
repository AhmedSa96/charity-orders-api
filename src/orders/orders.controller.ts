import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import * as jwtAuthGuard from '../auth/jwt-auth.guard';
import { GetOrdersFiltersDto } from './dto/get-orders-filters-dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(jwtAuthGuard.JwtAuthGuard)
  @Post()
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(jwtAuthGuard.JwtAuthGuard)
  @Get()
  @ApiOkResponse({ description: 'The records have been successfully retrieved.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll(@Query() filters: GetOrdersFiltersDto) {
    return this.ordersService.findAll(filters);
  }

  @UseGuards(jwtAuthGuard.JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: 'The record has been successfully retrieved.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(jwtAuthGuard.JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(jwtAuthGuard.JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'The record has been successfully deleted.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
