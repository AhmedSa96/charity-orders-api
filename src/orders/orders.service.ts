import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.ordersRepository.create(createOrderDto);
    return await this.ordersRepository.save(order);
  }

  async findAll() {
    return await this.ordersRepository.find({ relations: ['user'] });
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
    return await this.ordersRepository.remove(order);
  }
}
