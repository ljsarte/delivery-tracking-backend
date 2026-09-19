import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { RidersModule } from './riders/riders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

import { User } from './users/entities/user.entity';
import { Order } from './orders/entities/order.entity';
import { Rider } from './riders/entities/rider.entity';
import { Delivery } from './deliveries/entities/delivery.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env once, everywhere

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [User, Order, Rider, Delivery],
        synchronize: true, // OK for coursework - auto-creates tables from entities.
        // Turn this off and use real migrations before this ever touches production data.
      }),
    }),

    AuthModule,
    UsersModule,
    OrdersModule,
    RidersModule,
    DeliveriesModule,
  ],
})
export class AppModule {}
