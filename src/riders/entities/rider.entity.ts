import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Delivery } from '../../deliveries/entities/delivery.entity';

@Entity('riders')
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-one with User: a rider profile always belongs to exactly one user account.
  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column({ length: 50 })
  vehicleType: string; // e.g. motorcycle, bicycle, car

  @Column({ length: 20, nullable: true })
  licensePlate: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  currentLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  currentLng: number;

  // A rider can be assigned to many deliveries over time.
  @OneToMany(() => Delivery, (delivery) => delivery.rider)
  deliveries: Delivery[];
}
