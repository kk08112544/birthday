import { Injectable } from '@nestjs/common';
import { ResponseFestivalDto } from './dto/response-festival.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FestivalRepositories {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string): Promise<ResponseFestivalDto[]> {
    const result = await this.prisma.festival.findMany({
      where: {
        deletedAt: null,

        ...(search
          ? {
              wisher: {
                some: {
                  deletedAt: null,
                  wishWord: {
                    contains: search,
                  },
                },
              },
            }
          : {}),
      },
      include: {
        wisher: {
          where: {
            deletedAt: null,
            ...(search
              ? {
                  wishWord: {
                    contains: search,
                  },
                }
              : {}),
          },
        },
        card: {
          where: {
            deletedAt: null,
          },
        },
      },
    });

    return result as unknown as ResponseFestivalDto[];
  }

  async findById(id: number): Promise<ResponseFestivalDto | null> {
    const data = await this.prisma.festival.findUnique({
      where: {
        fId: Number(id),
        deletedAt: null,
      },
      include: {
        wisher: {
          where: {
            deletedAt: null, // ดึงเฉพาะ wisher ที่ยังไม่ถูกลบ
          },
        },
        card: {
          where: {
            deletedAt: null, // ดึงเฉพาะ card ที่ยังไม่ถูกลบ
          },
        },
      },
    });
    return data;
  }
}
