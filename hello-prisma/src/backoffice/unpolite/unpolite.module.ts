import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';
import { AdminUnpoliteService } from './unpolite.service';
import { AdminUnpoliteController } from './unpolite.controller';
import { AdminUnpoliteRepositories } from './unpolite.repositories';
import { PrismaService } from 'src/prisma.service';
@Module({
  imports: [LoggerModule],
  controllers: [AdminUnpoliteController],
  providers: [AdminUnpoliteService, AdminUnpoliteRepositories, PrismaService],
})
export class AdminUnpoliteModule {}
