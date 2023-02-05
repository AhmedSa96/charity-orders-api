import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFiltersDto } from './dto/get-orders-filters-dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create(createOrderDto);
    return await this.ordersRepository.save(order);
  }

  async findAll(filters: GetOrdersFiltersDto) {
    return await this.ordersRepository.findOrdersByFilters(filters);
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({ where: { id },  relations: ['user'] });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    this.ordersRepository.merge(order, updateOrderDto);
    return await this.ordersRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return await this.ordersRepository.softRemove(order);
  }
}
