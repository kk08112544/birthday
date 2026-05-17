import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private prisma: PrismaService) {
    this.logger.log('✅ ScheduleService initialized');
  }

  @Cron('* * * * * *')
  async updateFestivalEditDelete() {
    this.logger.log('🕐 Cron triggered');
    try {
      const now = new Date();

      // ✅ พรุ่งนี้ 00:00:00 → endDate < พรุ่งนี้ = วันนี้และก่อนหน้า
      // เช่น 12/05/2569 < 13/05/2569 ✅
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );
      this.logger.log(`📅 Tomorrow: ${tomorrow.toISOString()}`);

      const expiredFestivals = await this.prisma.festival.findMany({
        where: {
          endDate: { lt: new Date() }, // endDate < GETDATE()
          deletedAt: null,
          isEdit: Boolean(true),
          isDelete: Boolean(true), // ✅ แก้จาก true → false
        },
        select: { fId: true, endDate: true, isEdit: true, isDelete: true },
      });

      this.logger.log(
        `🔍 Found ${expiredFestivals.length} records: ${JSON.stringify(expiredFestivals)}`,
      );

      if (expiredFestivals.length === 0) {
        this.logger.log('⚠️ No expired festivals found');
        return;
      }

      const ids = expiredFestivals.map((f) => f.fId);

      await this.prisma.festival.updateMany({
        where: { fId: { in: ids } },
        data: {
          isEdit: false,
          isDelete: false,
        },
      });

      this.logger.log(`✅ Updated ${ids.length} festivals`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('❌ Error:', error.message);
        this.logger.error('❌ Stack:', error.stack);
      } else {
        this.logger.error('❌ Unknown Error:', String(error));
      }
    }
  }

  // แนะนำ: เปลี่ยนจากดึงทุกๆ 1 วินาที ('* * * * * *') เป็นทำงานทุกวันตอนเที่ยงคืนดีกว่าครับ
  // เช่น '0 0 0 * * *' เพื่อไม่ให้ฝั่ง Database ทำงานหนักเกินไปโดยไม่จำเป็น
  @Cron('* * * * * *')
  async updateFestivalEditEndDate() {
    this.logger.log('🕐 Cron triggered');
    try {
      const now = new Date();

      //  คำนวณหาวันที่ย้อนหลังไป 7 วัน (นับจากเวลานี้ หรือ เที่ยงคืนของวันนี้)
      // แนะนำให้ตั้งเวลาเป็น 23:59:59 ของ 7 วันที่แล้ว หรือใช้เวลาปัจจุบันย้อนไป 7 วันตรงๆ
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      //       const twoMinutesAgo = new Date();
      // twoMinutesAgo.setMinutes(twoMinutesAgo.getMinutes() - 5);

      this.logger.log(`📅 Current Date: ${now.toISOString()}`);
      this.logger.log(
        `📅 Target Date (7 Days Ago): ${sevenDaysAgo.toISOString()}`,
      );
      // this.logger.log(`📅 Target Date (2 Minutes Ago): ${twoMinutesAgo.toISOString()}`);

      const expiredFestivals = await this.prisma.festival.findMany({
        where: {
          //  แก้ไขตรงนี้: endDate ต้องน้อยกว่าหรือเท่ากับ 7 วันที่แล้ว (<= 7 days ago)
          endDate: {
            lte: sevenDaysAgo,
          },
          deletedAt: null,
          // ใช้ค่า boolean ตรงๆ ได้เลย ไม่จำเป็นต้องครอบด้วย Boolean(true) ครับ
          isEditEndDate: true,
        },
        select: { fId: true, endDate: true, isEdit: true, isDelete: true },
      });

      this.logger.log(
        `🔍 Found ${expiredFestivals.length} records: ${JSON.stringify(expiredFestivals)}`,
      );

      if (expiredFestivals.length === 0) {
        this.logger.log('⚠️ No end date festivals found');
        return;
      }

      const ids = expiredFestivals.map((f) => f.fId);

      await this.prisma.festival.updateMany({
        where: { fId: { in: ids } },
        data: {
          isEdit: false,
          isDelete: false,
          isEditEndDate: false,
        },
      });

      this.logger.log(
        `✅ Updated ${ids.length} festivals to disabled (isEditEndDate = false)`,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('❌ Error:', error.message);
        this.logger.error('❌ Stack:', error.stack);
      } else {
        this.logger.error('❌ Unknown Error:', String(error));
      }
    }
  }
}
