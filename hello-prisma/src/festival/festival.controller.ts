import { Controller, Get, Param, Delete } from '@nestjs/common';
import { FestivalService } from './festival.service';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}

  @Get('all')
  findAll() {
    return this.festivalService.findAll();
  }

  @Get()
  findMany() {
    return this.festivalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.festivalService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.festivalService.remove(+id);
  }
}
