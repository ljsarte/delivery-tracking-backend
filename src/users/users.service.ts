import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    const saved = await this.userRepo.save(user);
    const { password, ...safe } = saved;
    return safe;
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users.map(({ password, ...safe }) => safe);
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    const { password, ...safe } = user;
    return safe;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    Object.assign(user, dto);
    const saved = await this.userRepo.save(user);
    const { password, ...safe } = saved;
    return safe;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    await this.userRepo.remove(user);
    return { deleted: true };
  }
}
