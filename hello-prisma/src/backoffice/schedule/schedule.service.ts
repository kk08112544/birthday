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

      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );

      this.logger.log(`📅 Tomorrow: ${tomorrow.toISOString()}`);

      const expiredFestivals = await this.prisma.festival.findMany({
        where: {
          endDate: {
            lt: tomorrow,
          },
          deletedAt: null,
          isEdit: true,
          isDelete: true,
        },
        select: {
          fId: true,
          endDate: true,
          isEdit: true,
          isDelete: true,
        },
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
