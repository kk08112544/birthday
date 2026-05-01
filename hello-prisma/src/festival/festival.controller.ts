import { Controller, Get, Param } from '@nestjs/common';
import { FestivalService } from './festival.service';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}

  @Get('all')
  findAll() {
    return this.festivalService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.festivalService.findById(id);
  }
}
