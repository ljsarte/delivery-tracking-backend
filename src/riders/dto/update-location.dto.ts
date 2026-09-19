import { IsLatitude, IsLongitude } from 'class-validator';

export class UpdateLocationDto {
  @IsLatitude()
  currentLat: number;

  @IsLongitude()
  currentLng: number;
}
