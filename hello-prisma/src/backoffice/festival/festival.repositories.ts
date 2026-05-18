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
    createdBy: number,
  ): Promise<ResponseFestivalDto> {
    const result = await this.prisma.festival.create({
      data: {
        festivalName: createFestivalDto.festivalName,
        image: createFestivalDto.image,
        webName: createFestivalDto.webName,
        logo: createFestivalDto.logo,

        startDate: new Date(createFestivalDto.startDate),
        endDate: new Date(createFestivalDto.endDate),

        createdByUser: {
          connect: {
            uId: createdBy,
          },
        },

        wisher: {
          create:
            createFestivalDto.wisher?.map((w) => ({
              wishWord: w.wishWord,
            })) || [],
        },

        card: {
          create:
            createFestivalDto.card?.map((c) => ({
              imageCard: c.imageCard,
            })) || [],
        },
      },

      include: {
        createdByUser: {
          select: {
            uId: true,
            firstName: true,
            userName: true,
            role: true,
          },
        },

        wisher: true,
        card: true,
      },
    });

    return result as unknown as ResponseFestivalDto;
  }

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
        createdByUser: {
          select: {
            uId: true,
            firstName: true,
            userName: true,
            role: true,
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
            deletedAt: null,
          },
        },

        card: {
          where: {
            deletedAt: null,
          },
        },

        createdByUser: {
          select: {
            uId: true,
            firstName: true,
            userName: true,
            role: true,
          },
        },
        deletedByUser: {
          select: {
            uId: true,
            firstName: true,
            userName: true,
            role: true,
          },
        },
      },
    });

    return data;
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
          createdByUser: {
            select: {
              uId: true,
              firstName: true,
              userName: true,
              role: true,
            },
          },
          deletedByUser: {
            select: {
              uId: true,
              firstName: true,
              userName: true,
              role: true,
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

  async findManyPaginatedCreator(
    createdBy: number,
    options: PaginationFestivalDto,
  ): Promise<PaginatedResult<ResponseFestivalDto>> {
    const whereCondition: Prisma.FestivalWhereInput = {
      createdBy: createdBy,
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
          createdByUser: {
            select: {
              uId: true,
              firstName: true,
              userName: true,
              role: true,
            },
          },
          deletedByUser: {
            select: {
              uId: true,
              firstName: true,
              userName: true,
              role: true,
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

  async update(
    id: number,
    updateFestivalDto: UpdateFestivalDto,
  ): Promise<ResponseFestivalDto> {
    const {
      festivalName,
      image,
      wisher,
      card,
      logo,
      webName,
      startDate,
      endDate,
    } = updateFestivalDto;

    return await this.prisma.$transaction(async (tx) => {
      // 1. ตรวจสอบว่า Festival มีอยู่จริง
      const existing = await tx.festival.findUnique({
        where: { fId: Number(id) },
      });

      if (!existing || existing.deletedAt) {
        throw new Error('Festival not found');
      }

      // 2. จัดการ WISHER (ใช้ wId)
      if (wisher) {
        // ดึงรายการ wId ทั้งหมดที่ส่งมา เพื่อเก็บไว้ (ตัวไหนไม่มีในนี้จะโดน Soft Delete)
        const wisherIdsToKeep = wisher.filter((w) => w.wId).map((w) => w.wId);

        await tx.wisher.updateMany({
          where: {
            festivalId: Number(id),
            wId: { notIn: wisherIdsToKeep }, // ใช้ wId แทน id
            deletedAt: null,
          },
          data: { deletedAt: new Date() },
        });

        for (const wData of wisher) {
          if (wData.wId) {
            // ถ้ามี wId ให้ Update
            await tx.wisher.update({
              where: { wId: wData.wId }, // ใช้ wId แทน id
              data: { wishWord: wData.wishWord },
            });
          } else {
            // ถ้าไม่มี wId ให้ Create ใหม่
            await tx.wisher.create({
              data: {
                wishWord: wData.wishWord,
                festivalId: Number(id),
              },
            });
          }
        }
      }

      // 3. จัดการ CARD (ใช้ cId)
      if (card) {
        const cardIdsToKeep = card.filter((c) => c.cId).map((c) => c.cId);

        await tx.card.updateMany({
          where: {
            festivalId: Number(id),
            cId: { notIn: cardIdsToKeep }, // ใช้ cId แทน id
            deletedAt: null,
          },
          data: { deletedAt: new Date() },
        });

        for (const cData of card) {
          if (cData.cId) {
            await tx.card.update({
              where: { cId: cData.cId }, // ใช้ cId แทน id
              data: { imageCard: cData.imageCard },
            });
          } else {
            await tx.card.create({
              data: {
                imageCard: cData.imageCard,
                festivalId: Number(id),
              },
            });
          }
        }
      }

      // 4. Update ข้อมูลหลักและ Return
      return await tx.festival.update({
        where: { fId: Number(id) },
        data: {
          festivalName,
          image,
          logo,
          webName,

          ...(startDate && {
            startDate: new Date(startDate),
          }),

          ...(endDate && {
            endDate: new Date(endDate),
          }),
        },
        include: {
          wisher: { where: { deletedAt: null } },
          card: { where: { deletedAt: null } },
          createdByUser: {
            select: {
              uId: true,
              firstName: true,
              userName: true,
              role: true,
            },
          },
          deletedByUser: {
            select: {
              uId: true,
              firstName: true,
              userName: true,
              role: true,
            },
          },
        },
      });
    });
  }

  async delete(id: number, deletedBy: number): Promise<ResponseFestivalDto> {
    const data = await this.prisma.festival.update({
      where: {
        fId: Number(id),
      },
      data: {
        deletedAt: new Date(), // อัปเดต deletedAt เป็นวันที่ปัจจุบันแทนการลบจริง
        deletedBy: deletedBy,
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
        createdByUser: {
          select: {
            uId: true,
            firstName: true,
            userName: true,
            role: true,
          },
        },
        deletedByUser: {
          select: {
            uId: true,
            firstName: true,
            userName: true,
            role: true,
          },
        },
      },
    });
    return data;
  }

  async findDeleteExits(id: number): Promise<boolean> {
    const data = await this.prisma.festival.findFirst({
      where: {
        fId: Number(id),
        deletedAt: null,
        isDelete: Boolean(true),
      },
      include: {
        wisher: {
          where: {
            deletedAt: null,
          },
        },
        card: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
    return !!data;
  }

  async findByCreatorId(
    id: number,
    createdBy: number,
  ): Promise<ResponseFestivalDto | null> {
    const data = await this.prisma.festival.findFirst({
      where: {
        fId: Number(id),
        createdBy: Number(createdBy),
        deletedAt: null,
      },
      include: {
        wisher: {
          where: {
            deletedAt: null,
          },
        },
        card: {
          where: {
            deletedAt: null,
          },
        },

        // ✅ เพิ่มตรงนี้
        createdByUser: true,
        deletedByUser: true,
      },
    });

    return data;
  }
}
