import { Module } from '@nestjs/common';
import { AdminFestivalService } from './festival.service';
import { AdminFestivalController } from './festival.controller';

@Module({
  controllers: [AdminFestivalController],
  providers: [AdminFestivalService],
})
export class AdminFestivalModule {}
