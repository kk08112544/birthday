import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminFestivalService } from './festival.service';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/festival')
export class AdminFestivalController {
  constructor(private readonly adminfestivalService: AdminFestivalService) {}

  @Post()
  create(@Body() createFestivalDto: CreateFestivalDto) {
    return this.adminfestivalService.create(createFestivalDto);
  }

  @Get('all')
  findAll() {
    return this.adminfestivalService.findAll();
  }

  @Get(':id')
  findฺById(@Param('id') id: number) {
    return this.adminfestivalService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFestivalDto: UpdateFestivalDto,
  ) {
    return this.adminfestivalService.update(id, updateFestivalDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.adminfestivalService.delete(id);
  }
}
