import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rider } from './entities/rider.entity';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class RidersService {
  constructor(
    @InjectRepository(Rider)
    private readonly riderRepo: Repository<Rider>,
  ) {}

  create(dto: CreateRiderDto) {
    const rider = this.riderRepo.create(dto);
    return this.riderRepo.save(rider).then((r) => this.stripPassword(r));
  }

  async findAll() {
    const riders = await this.riderRepo.find();
    return riders.map((r) => this.stripPassword(r));
  }

  async findOne(id: number) {
    const rider = await this.riderRepo.findOne({ where: { id } });
    if (!rider) throw new NotFoundException(`Rider ${id} not found`);
    return this.stripPassword(rider);
  }

  async update(id: number, dto: UpdateRiderDto) {
    const rider = await this.findRaw(id);
    Object.assign(rider, dto);
    const saved = await this.riderRepo.save(rider);
    return this.stripPassword(saved);
  }

  // Called frequently by the rider's mobile app while a delivery is in progress.
  async updateLocation(id: number, dto: UpdateLocationDto) {
    const rider = await this.findRaw(id);
    rider.currentLat = dto.currentLat;
    rider.currentLng = dto.currentLng;
    const saved = await this.riderRepo.save(rider);
    return this.stripPassword(saved);
  }

  async remove(id: number) {
    const rider = await this.findRaw(id);
    await this.riderRepo.remove(rider);
    return { deleted: true };
  }

  // Internal helper: fetch the raw entity (still has the eager "user" relation
  // attached) for use in update/save operations.
  private async findRaw(id: number) {
    const rider = await this.riderRepo.findOne({ where: { id } });
    if (!rider) throw new NotFoundException(`Rider ${id} not found`);
    return rider;
  }

  // The eager "user" relation includes the full User entity, which would
  // expose the hashed password in the API response. Strip it here.
  private stripPassword(rider: Rider) {
    if (rider.user) {
      const { password, ...safeUser } = rider.user as any;
      return { ...rider, user: safeUser };
    }
    return rider;
  }
}