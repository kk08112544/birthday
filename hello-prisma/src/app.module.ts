import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { FestivalModule } from './festival/festival.module';
import { SenderModule } from './sender/sender.module';
import { AdminCardModule } from './admin/card/card.module';
import { AdminUnpoliteModule } from './admin/unpolite/unpolite.module';
import { AdminFestivalModule } from './admin/festival/festival.module';
import { AdminWisherModule } from './admin/wisher/wisher.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { AdminScheduleModule } from './admin/schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    FestivalModule,
    SenderModule,
    AdminUnpoliteModule,
    AdminFestivalModule,
    AdminWisherModule,
    AdminCardModule,
    UploadModule,
    AuthModule,
    AdminScheduleModule, // ✅ เพิ่มตรงนี้
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
