import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';
import { AdminFestivalService } from './festival.service';
import { AdminFestivalController } from './festival.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminFestivalRepositories } from './festival.repositories';
import { AdminRepositories } from '../admin/admin.repositories';

@Module({
  imports: [LoggerModule],
  controllers: [AdminFestivalController],
  providers: [
    AdminFestivalService,
    PrismaService,
    AdminFestivalRepositories,
    AdminRepositories,
  ],
})
export class AdminFestivalModule {}
