import { Controller, Get } from '@nestjs/common';
import { FestivalService } from './festival.service';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}

  @Get('all')
  findAll() {
    return this.festivalService.findAll();
  }
}
