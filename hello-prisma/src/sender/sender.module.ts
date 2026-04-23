import { Module } from '@nestjs/common';
import { SenderService } from './sender.service';
import { SenderController } from './sender.controller';
import { SenderRepositories } from './sender.repositories';
import { PrismaService } from '../prisma.service';
import { UnpoliteRepositories } from 'src/unpolite/unpolite.repositories';
import { ExceptionsModule } from 'src/common/exception/exception.module';

@Module({
  imports: [ExceptionsModule],
  controllers: [SenderController],
  providers: [
    SenderService,
    SenderRepositories,
    PrismaService,
    UnpoliteRepositories,
  ],
})
export class SenderModule {}
