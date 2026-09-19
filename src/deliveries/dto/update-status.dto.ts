import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DeliveryStatus } from '../entities/delivery.entity';

export class UpdateStatusDto {
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
