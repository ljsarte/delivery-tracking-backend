import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  customerId: number;

  @IsString()
  pickupAddress: string;

  @IsString()
  dropoffAddress: string;

  @IsOptional()
  @IsString()
  itemDescription?: string;
}
