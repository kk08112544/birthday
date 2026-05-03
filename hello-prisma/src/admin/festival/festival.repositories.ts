import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseFestivalDto } from './dto/response-festival.dto';
import { PaginationFestivalDto } from './dto/pagination-festival.dto';
import { PaginatedResult } from 'src/common/pagination/paginate.interface';
import { Prisma } from '@prisma/client';
import { paginate } from 'src/common/pagination/paginate.util';
// import { Wisher } from '../wisher/entities/wisher.entity';
@Injectable()
export class AdminFestivalRepositories {
  constructor(private prisma: PrismaService) {}

  async create(
    createFestivalDto: CreateFestivalDto,
  ): Promise<ResponseFestivalDto> {
    const result = await this.prisma.festival.create({
      data: {
        festivalName: createFestivalDto.festivalName,
        image: createFestivalDto.image || '',

        // การใช้ .map แบบนี้รองรับทั้ง 1 รายการ และมากกว่า 1 รายการ
        wisher: {
          create:
            createFestivalDto.wisher?.map((w) => ({
              wishWord: w.wishWord, // สร้าง wisher หลายคน/รายการ
            })) || [], // ใส่ || [] เผื่อกรณี wisher ส่งมาเป็น null/undefined
        },

        card: {
          create:
            createFestivalDto.card?.map((c) => ({
              imageCard: c.imageCard, // สร้าง card หลายใบ
            })) || [],
        },
      },
      include: {
        wisher: true,
        card: true,
      },
    });
    console.log('Created Festival:', result); // ตรวจสอบข้อมูลที่ถูกสร้าง
    return result as unknown as ResponseFestivalDto;
  }
  // async create(createFestivalDto: CreateFestivalDto): Promise<ResponseFestivalDto> {
  //   const result = await this.prisma.festival.create({
  //     data: {
  //       festivalName: createFestivalDto.festivalName,
  //       // ใส่ชื่อไฟล์รูปภาพที่ได้จาก DTO (ซึ่ง Service ควรส่งมาให้)
  //       image: createFestivalDto.image,

  //      wisher: {
  //   create: createFestivalDto.wisher?.map(w => ({
  //     // ส่ง string เข้าไปตรงๆ ไม่ต้องมี { create: ... }
  //     wishWord: w.wishWord
  //   }))
  // },
  //       card: {
  //         create: createFestivalDto.card?.map(c => ({
  //           imageCard: c.imageCard
  //         })) || []
  //       }
  //     },
  //     include: {
  //       wisher: true,
  //       card: true
  //     }
  //   });
  //   return result;
  // }

  async findAll(): Promise<ResponseFestivalDto[]> {
    const result = await this.prisma.festival.findMany({
      where: {
        deletedAt: null, // ดึงเฉพาะ Festival ที่ยังไม่ถูกลบ
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

    return result as unknown as ResponseFestivalDto[];
  }

  async findManyPaginated(
    options: PaginationFestivalDto,
  ): Promise<PaginatedResult<ResponseFestivalDto>> {
    const whereCondition: Prisma.FestivalWhereInput = {
      deletedAt: null,
    };

    if (options.search) {
      whereCondition.OR = [
        {
          festivalName: {
            contains: options.search,
          },
        },
      ];
    }

    const queryFn = (skip: number, take: number) => {
      return this.prisma.festival.findMany({
        where: whereCondition,
        skip, // ✅ ต้องมีค่าเสมอ
        take, // ✅ ต้องมีค่าเสมอ
        orderBy: {
          createdAt: 'desc',
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
    };
    const countFn = () => {
      return this.prisma.festival.count({
        where: whereCondition,
      });
    };

    return paginate(queryFn, countFn, options);
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

  // async update(
  //   id: number,
  //   updateFestivalDto: UpdateFestivalDto,
  // ): Promise<ResponseFestivalDto> {
  //   const data = await this.prisma.festival.update({
  //     where: {
  //       fId: Number(id),
  //       deletedAt: null,
  //     },
  //     data: {
  //       festivalName: updateFestivalDto.festivalName,
  //     },
  //     include: {
  //       wisher: {
  //         where: {
  //           deletedAt: null, // ดึงเฉพาะ wisher ที่ยังไม่ถูกลบ
  //         },
  //       },
  //       card: {
  //         where: {
  //           deletedAt: null, // ดึงเฉพาะ card ที่ยังไม่ถูกลบ
  //         },
  //       },
  //     },
  //   });
  //   return data;
  // }
  async update(
    id: number,
    updateFestivalDto: UpdateFestivalDto,
  ): Promise<ResponseFestivalDto> {
    const { festivalName, image, wisher, card } = updateFestivalDto;

    return await this.prisma.$transaction(async (tx) => {
      const existing = await tx.festival.findFirst({
        where: { fId: Number(id), deletedAt: null },
      });

      if (!existing) {
        throw new Error('Festival not found');
      }

      await tx.festival.update({
        where: { fId: Number(id) },
        data: {
          festivalName,
          image,
        },
      });

      await tx.wisher.updateMany({
        where: { festivalId: Number(id), deletedAt: null },
        data: { deletedAt: new Date() },
      });

      if (wisher?.length) {
        await tx.wisher.createMany({
          data: wisher.map((w) => ({
            wishWord: w.wishWord,
            festivalId: Number(id),
          })),
        });
      }

      await tx.card.updateMany({
        where: { festivalId: Number(id), deletedAt: null },
        data: { deletedAt: new Date() },
      });

      if (card?.length) {
        await tx.card.createMany({
          data: card.map((c) => ({
            imageCard: c.imageCard,
            festivalId: Number(id),
          })),
        });
      }

      const result = await tx.festival.findUnique({
        where: { fId: Number(id) },
        include: {
          wisher: { where: { deletedAt: null } },
          card: { where: { deletedAt: null } },
        },
      });

      if (!result) {
        throw new Error('Festival not found after update');
      }

      return result;
    });
  }

  async delete(id: number): Promise<ResponseFestivalDto> {
    const data = await this.prisma.festival.update({
      where: {
        fId: Number(id),
      },
      data: {
        deletedAt: new Date(), // อัปเดต deletedAt เป็นวันที่ปัจจุบันแทนการลบจริง
        wisher: {
          updateMany: {
            where: {
              festivalId: Number(id),
              deletedAt: null,
            },
            data: {
              deletedAt: new Date(),
            },
          },
        },
        card: {
          updateMany: {
            where: {
              festivalId: Number(id),
              deletedAt: null,
            },
            data: {
              deletedAt: new Date(),
            },
          },
        },
      },
      include: {
        wisher: true,
        card: true,
      },
    });
    return data;
  }
}
