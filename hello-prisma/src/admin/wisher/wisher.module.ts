import { Module } from '@nestjs/common';
import { AdminWisherService } from './wisher.service';
import { AdminWisherController } from './wisher.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminWisherRepositories } from './wisher.repositories';
import { AdminFestivalRepositories } from '../festival/festival.repositories';
@Module({
  controllers: [AdminWisherController],
  providers: [
    AdminWisherService,
    PrismaService,
    AdminWisherRepositories,
    AdminFestivalRepositories,
  ],
})
export class AdminWisherModule {}
