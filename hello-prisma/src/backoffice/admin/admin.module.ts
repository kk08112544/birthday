import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminRepositories } from './admin.repositories';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, AdminRepositories],
})
export class AdminModule {}
