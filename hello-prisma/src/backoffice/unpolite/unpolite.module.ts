import { Module } from '@nestjs/common';
import { AdminUnpoliteService } from './unpolite.service';
import { AdminUnpoliteController } from './unpolite.controller';
import { AdminUnpoliteRepositories } from './unpolite.repositories';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [AdminUnpoliteController],
  providers: [AdminUnpoliteService, AdminUnpoliteRepositories, PrismaService],
})
export class AdminUnpoliteModule {}
