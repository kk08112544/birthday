import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // เพิ่มบรรทัดนี้
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FestivalModule } from './festival/festival.module';
import { SenderModule } from './sender/sender.module';

import { AdminUnpoliteModule } from './admin/unpolite/unpolite.module';
import { AdminFestivalModule } from './admin/festival/festival.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ต้องอยู่บนสุด เพื่อให้ตัวอื่นเห็นค่าใน .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FestivalModule,
    SenderModule,
    AdminUnpoliteModule,
    AdminFestivalModule,
    FileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
