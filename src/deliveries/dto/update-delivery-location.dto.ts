import { IsLatitude, IsLongitude } from 'class-validator';

export class UpdateDeliveryLocationDto {
  @IsLatitude()
  currentLat: number;

  @IsLongitude()
  currentLng: number;
}
