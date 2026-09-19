import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  create(dto: CreateOrderDto) {
    const order = this.orderRepo.create(dto);
    return this.orderRepo.save(order);
  }

  async findAll() {
    const orders = await this.orderRepo.find({ relations: ['customer', 'delivery'] });
    return orders.map((order) => this.stripPassword(order));
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['customer', 'delivery'],
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return this.stripPassword(order);
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    Object.assign(order, dto);
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    await this.orderRepo.remove(order);
    return { deleted: true };
  }

  async findByCustomer(customerId: number) {
    return this.orderRepo.find({ where: { customerId }, relations: ['delivery'] });
  }

  // The nested "customer" relation includes the full User entity by default,
  // which would expose the hashed password in the API response. Strip it here.
  private stripPassword(order: Order) {
    if (order.customer) {
      const { password, ...safeCustomer } = order.customer as any;
      return { ...order, customer: safeCustomer };
    }
    return order;
  }
}