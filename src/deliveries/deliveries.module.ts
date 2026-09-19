import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Order } from '../orders/entities/order.entity';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery, Order])],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}
