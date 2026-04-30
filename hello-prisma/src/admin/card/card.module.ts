import { Module } from '@nestjs/common';
import { AdminCardService } from './card.service';
import { AdminCardController } from './card.controller';
import { AdminCardRepositories } from './card.repositories';
import { AdminFestivalRepositories } from '../festival/festival.repositories';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [AdminCardController],
  providers: [
    AdminCardService,
    AdminCardRepositories,
    AdminFestivalRepositories,
    PrismaService,
  ],
})
export class AdminCardModule {}
