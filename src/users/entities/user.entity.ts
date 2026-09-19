import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum UserRole {
  CUSTOMER = 'customer',
  RIDER = 'rider',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ unique: true })
  email: string;

  // Never stored in plain text - hashed with bcrypt in AuthService before saving.
  @Column()
  password: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  // A customer can place many orders. Riders don't use this side of the relation.
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
