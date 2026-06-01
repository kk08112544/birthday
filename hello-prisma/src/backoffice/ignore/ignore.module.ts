import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';
import { AdminIgnoreService } from './ignore.service';
import { AdminIgnoreController } from './ignore.controller';
import { AdminIgnoreRepositories } from './ignore.repositories';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [LoggerModule],
  controllers: [AdminIgnoreController],
  providers: [AdminIgnoreService, AdminIgnoreRepositories, PrismaService],
})
export class AdminIgnoreModule {}
