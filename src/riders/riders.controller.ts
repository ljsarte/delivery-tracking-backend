import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RidersService } from './riders.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('riders')
@UseGuards(JwtAuthGuard)
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Post()
  create(@Body() dto: CreateRiderDto) {
    return this.ridersService.create(dto);
  }

  @Get()
  findAll() {
    return this.ridersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ridersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRiderDto) {
    return this.ridersService.update(id, dto);
  }

  // PUT because the rider's app replaces the full current location each time.
  @Put(':id/location')
  updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.ridersService.updateLocation(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ridersService.remove(id);
  }
}
