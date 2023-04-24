import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetOrdersFiltersDto } from './dto/get-orders-filters-dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ description: 'The records have been successfully retrieved.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  async findAll(@Query() filters: GetOrdersFiltersDto) {
    return await this.ordersService.findAll(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: 'The record has been successfully retrieved.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'The record has been successfully deleted.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
