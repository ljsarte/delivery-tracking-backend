import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery, DeliveryStatus } from './entities/delivery.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateDeliveryLocationDto } from './dto/update-delivery-location.dto';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepo: Repository<Delivery>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  // Assigning a rider to an order - also flips the order to "dispatched",
  // matching the flow described in Part D of your architecture notes.
  async create(dto: CreateDeliveryDto) {
    const delivery = this.deliveryRepo.create(dto);
    const saved = await this.deliveryRepo.save(delivery);

    await this.orderRepo.update(dto.orderId, { status: OrderStatus.DISPATCHED });

    return saved;
  }

  findAll() {
    return this.deliveryRepo.find({ relations: ['order', 'rider'] });
  }

  async findOne(id: number) {
    const delivery = await this.deliveryRepo.findOne({
      where: { id },
      relations: ['order', 'rider'],
    });
    if (!delivery) throw new NotFoundException(`Delivery ${id} not found`);
    return delivery;
  }

  // This is the "notification trigger" point from your Part D flow: whenever
  // status changes, a real implementation would also call the SMS/notification
  // service here (see the note in deliveries.service.ts below).
  async updateStatus(id: number, dto: UpdateStatusDto) {
    const delivery = await this.findOne(id);
    delivery.status = dto.status;
    if (dto.notes) delivery.notes = dto.notes;

    if (dto.status === DeliveryStatus.DELIVERED) {
      delivery.deliveredAt = new Date();
      await this.orderRepo.update(delivery.orderId, {
        status: OrderStatus.COMPLETED,
      });
    }
    if (dto.status === DeliveryStatus.FAILED) {
      await this.orderRepo.update(delivery.orderId, {
        status: OrderStatus.CANCELLED,
      });
    }

    // TODO: call your NotificationsService / SMS gateway here, e.g.
    // await this.notificationsService.notifyCustomer(delivery.orderId, dto.status);

    return this.deliveryRepo.save(delivery);
  }

  async updateLocation(id: number, dto: UpdateDeliveryLocationDto) {
    const delivery = await this.findOne(id);
    delivery.currentLat = dto.currentLat;
    delivery.currentLng = dto.currentLng;
    return this.deliveryRepo.save(delivery);
  }

  async remove(id: number) {
    const delivery = await this.findOne(id);
    await this.deliveryRepo.remove(delivery);
    return { deleted: true };
  }
}
