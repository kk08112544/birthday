import { Module } from '@nestjs/common';
import { AdminFestivalService } from './festival.service';
import { AdminFestivalController } from './festival.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminFestivalRepositories } from './festival.repositories';

@Module({
  controllers: [AdminFestivalController],
  providers: [AdminFestivalService, PrismaService, AdminFestivalRepositories],
})
export class AdminFestivalModule {}
