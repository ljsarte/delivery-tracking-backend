import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRiderDto {
  @IsInt()
  userId: number;

  @IsString()
  vehicleType: string;

  @IsOptional()
  @IsString()
  licensePlate?: string;
}
