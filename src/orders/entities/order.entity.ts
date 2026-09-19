import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Delivery } from '../../deliveries/entities/delivery.entity';

export enum OrderStatus {
  PENDING = 'pending',
  DISPATCHED = 'dispatched',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // Many orders belong to one customer.
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @Column()
  customerId: number;

  @Column({ length: 255 })
  pickupAddress: string;

  @Column({ length: 255 })
  dropoffAddress: string;

  @Column({ type: 'text', nullable: true })
  itemDescription: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  // Each order gets exactly one delivery record once a rider is assigned.
  @OneToOne(() => Delivery, (delivery) => delivery.order)
  delivery: Delivery;
}
