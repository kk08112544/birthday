import { Module } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { FestivalController } from './festival.controller';
import { FestivalRepositories } from './festival.repositories';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FestivalController],
  providers: [FestivalService, FestivalRepositories, PrismaService],
})
export class FestivalModule {}
