import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { FestivalModule } from './festival/festival.module';
import { SenderModule } from './sender/sender.module';
import { AdminUnpoliteModule } from './backoffice/unpolite/unpolite.module';
import { AdminFestivalModule } from './backoffice/festival/festival.module';
import { AdminModule } from './backoffice/admin/admin.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './backoffice/auth/auth.module';
import { AdminScheduleModule } from './backoffice/schedule/schedule.module';

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
    UploadModule,
    AuthModule,
    AdminModule,
    AdminScheduleModule, // ✅ เพิ่มตรงนี้
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
