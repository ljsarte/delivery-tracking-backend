import { IsInt } from 'class-validator';

export class CreateDeliveryDto {
  @IsInt()
  orderId: number;

  @IsInt()
  riderId: number;
}
