import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Rider } from '../../riders/entities/rider.entity';

export enum DeliveryStatus {
  ASSIGNED = 'assigned',
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-one: each delivery record tracks exactly one order.
  @OneToOne(() => Order, (order) => order.delivery)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  orderId: number;

  // Many-to-one: a rider handles many deliveries over time.
  @ManyToOne(() => Rider, (rider) => rider.deliveries)
  @JoinColumn({ name: 'riderId' })
  rider: Rider;

  @Column()
  riderId: number;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.ASSIGNED,
  })
  status: DeliveryStatus;

  // Live GPS position, updated by the rider's mobile app as they travel.
  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  currentLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  currentLng: number;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string; // e.g. failure reason

  @UpdateDateColumn()
  updatedAt: Date;
}
