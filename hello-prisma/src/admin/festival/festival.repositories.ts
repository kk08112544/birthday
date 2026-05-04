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
        ...createFestivalDto, // ใช้ spread operator เพื่อใส่ข้อมูลจาก DTO ลงไปใน data
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
  // }4
//   async update(
//   id: number,
//   updateFestivalDto: UpdateFestivalDto,
// ): Promise<ResponseFestivalDto> {
//   const { festivalName, image, wisher, card } = updateFestivalDto;

//   return await this.prisma.$transaction(async (tx) => {
//     // 1. ตรวจสอบว่ามี Festival อยู่จริงและดึงข้อมูลเดิมพร้อม Relations มาดู
//     const existing = await tx.festival.findUnique({
//       where: { fId: Number(id) },
//       include: {
//         wisher: { where: { deletedAt: null } },
//         card: { where: { deletedAt: null } },
//       },
//     });

//     if (!existing || existing.deletedAt) {
//       throw new Error('Festival not found');
//     }

//     // 2. จัดการข้อมูล WISHER (Concept: Keep, Update, or Create)
//     if (wisher) {
//       const wisherIdsToKeep = wisher.filter((w) => w.wId).map((w) => w.wId!);
      
//       // Soft Delete ตัวที่ไม่อยู่ใน List ใหม่
//       await tx.wisher.updateMany({
//         where: {
//           festivalId: Number(id),
//           wId: { notIn: wisherIdsToKeep },
//           deletedAt: null,
//         },
//         data: { deletedAt: new Date() },
//       });

//       // วนลูปเพื่อ Update หรือ Create
//       for (const wData of wisher) {
//         if (wData.wId) {
//           await tx.wisher.update({
//             where: { wId: wData.wId },
//             data: { wishWord: wData.wishWord },
//           });
//         } else {
//           await tx.wisher.create({
//             data: {
//               wishWord: wData.wishWord,
//               festivalId: Number(id),
//             },
//           });
//         }
//       }
//     }

//     // 3. จัดการข้อมูล CARD (Concept: Keep, Update, or Create)
//     if (card) {
//       const cardIdsToKeep = card.filter((c) => c.cId).map((c) => c.cId!);

//       // Soft Delete ตัวที่ไม่อยู่ใน List ใหม่
//       await tx.card.updateMany({
//         where: {
//           festivalId: Number(id),
//           cId: { notIn: cardIdsToKeep },
//           deletedAt: null,
//         },
//         data: { deletedAt: new Date() },
//       });

//       for (const cData of card) {
//         if (cData.cId) {
//           await tx.card.update({
//             where: { cId: cData.cId },
//             data: { imageCard: cData.imageCard },
//           });
//         } else {
//           await tx.card.create({
//             data: {
//               imageCard: cData.imageCard,
//               festivalId: Number(id),
//             },
//           });
//         }
//       }
//     }

//     // 4. Update ข้อมูลหลักของ Festival และ Return ผลลัพธ์
//     return await tx.festival.update({
//       where: { fId: Number(id) },
//       data: {
//         festivalName,
//         image,
//       },
//       include: {
//         wisher: { where: { deletedAt: null } },
//         card: { where: { deletedAt: null } },
//       },
//     });
//   });
// }
async update(
  id: number,
  updateFestivalDto: UpdateFestivalDto,
): Promise<ResponseFestivalDto> {
  const { festivalName, image, wisher, card, logo, webName } = updateFestivalDto;

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
      const wisherIdsToKeep = wisher
        .filter((w) => w.wId)
        .map((w) => w.wId);

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
      const cardIdsToKeep = card
        .filter((c) => c.cId)
        .map((c) => c.cId);

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
      },
      include: {
        wisher: { where: { deletedAt: null } },
        card: { where: { deletedAt: null } },
      },
    });
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
