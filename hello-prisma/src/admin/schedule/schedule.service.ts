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
  async updateFestivalStatus() {
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
}
