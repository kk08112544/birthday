import { Injectable } from '@nestjs/common';
import { CreateSenderDto } from './dto/create-sender.dto';
// import { UpdateSenderDto } from './dto/update-sender.dto';
import { ResponseSenderDto } from './dto/response-sender.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationSenderDto } from './dto/pagination-sender.dto';
import { PaginatedResult } from 'src/common/pagination/paginate.interface';
import { Prisma } from '@prisma/client';
import { paginate } from 'src/common/pagination/paginate.util';
@Injectable()
export class SenderRepositories {
  constructor(private prisma: PrismaService) {}
  async create(createSenderDto: CreateSenderDto): Promise<ResponseSenderDto> {
    const result = (await this.prisma.sender.create({
      data: {
        ...createSenderDto,
      },
      select: {
        sId: true,
        fullname: true,
        position: true,
        department: true,
        createdAt: true,
        cardId: true,
        wishId: true,
        festivalId: true, // ✅ ดึง festivalId มาแล้ว (ถูกต้อง)

        card: {
          select: {
            cId: true,
            imageCard: true,
          },
        },
        wish: {
          select: {
            wId: true,
            wishWord: true,
          },
        },
        festival: {
          select: {
            fId: true, // ✅ ต้องเพิ่มบรรทัดนี้ เพราะ DTO บังคับว่าต้องมี fId
            festivalName: true,
          },
        },
      },
    })) as ResponseSenderDto;

    return result;
  }
  async findAll(): Promise<ResponseSenderDto[]> {
    const data = (await this.prisma.sender.findMany({
      where: {
        festival: {
          deletedAt: null, // ตรวจสอบว่าเทศกาลที่ผูกอยู่ยังไม่ถูกลบ
        },
      },
      select: {
        sId: true,
        fullname: true,
        position: true,
        department: true,
        cardId: true,
        wishId: true,
        createdAt: true,
        festivalId: true,
        card: {
          select: {
            cId: true,
            imageCard: true,
          },
        },
        wish: {
          select: {
            wId: true,
            wishWord: true,
          },
        },
        festival: {
          select: {
            fId: true,
            festivalName: true,
          },
        },
      },
    })) as ResponseSenderDto[];
    return data;
  }
  async findManyPaginated(
    options: PaginationSenderDto,
  ): Promise<PaginatedResult<ResponseSenderDto>> {
    const andConditions: Prisma.SenderWhereInput[] = [];

    const whereCondition: Prisma.SenderWhereInput = {
      festival: {
        deletedAt: null,
      },
    };

    // ✅ search
    if (options.fullname || options.department || options.position) {
      andConditions.push({
        OR: [
          ...(options.fullname
            ? [
                {
                  fullname: {
                    contains: options.fullname,
                  },
                },
              ]
            : []),

          ...(options.department
            ? [
                {
                  department: {
                    contains: options.department,
                  },
                },
              ]
            : []),

          ...(options.position
            ? [
                {
                  position: {
                    contains: options.position,
                  },
                },
              ]
            : []),
        ],
      });
    }

    // ✅ month only
    if (options.month && !options.year) {
      const month = Number(options.month);
      const year = new Date().getFullYear();

      andConditions.push({
        createdAt: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      });
    }

    // ✅ month + year
    if (options.month && options.year) {
      const month = Number(options.month);
      const year = Number(options.year);

      andConditions.push({
        createdAt: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      });
    }

    // ✅ year only
    if (options.year && !options.month) {
      const year = Number(options.year);

      andConditions.push({
        createdAt: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      });
    }

    // ✅ ใส่ AND ทีเดียว
    if (andConditions.length > 0) {
      whereCondition.AND = andConditions;
    }

    // ✅ FIX: queryFn ต้อง return
    const queryFn = (skip: number, take: number) => {
      return this.prisma.sender.findMany({
        where: whereCondition,
        skip, // ✅ ต้องมีค่าเสมอ
        take, // ✅ ต้องมีค่าเสมอ
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          sId: true,
          fullname: true,
          position: true,
          department: true,
          festivalId: true,
          cardId: true,
          wishId: true,
          createdAt: true,
          card: { select: { cId: true, imageCard: true } },
          wish: { select: { wId: true, wishWord: true } },
          festival: { select: { fId: true, festivalName: true } },
        },
      });
    };
    // const queryFn = (skip?: number, take?: number) => {
    //   return this.prisma.sender.findMany({
    //     where: whereCondition,
    //     skip,
    //     take,
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //      select: {
    //     sId: true,
    //     fullname: true,
    //     position: true,
    //     department: true,
    //     festivalId: true,
    //     cardId: true,
    //     wishId: true,
    //     createdAt: true,

    //     card: {
    //       select: {
    //         cId: true,
    //         imageCard: true,
    //       },
    //     },
    //     wish: {
    //       select: {
    //         wId: true,
    //         wishWord: true,
    //       },
    //     },
    //     festival: {
    //       select: {
    //         fId: true,
    //         festivalName: true,
    //       },
    //     },
    //   },
    //   });
    // };

    // ✅ FIX: countFn ต้องเป็น function
    const countFn = () => {
      return this.prisma.sender.count({
        where: whereCondition,
      });
    };

    // ❗ ถ้ายัง error paginate → แปลว่ายังไม่ได้ import
    return paginate(queryFn, countFn, options);
  }

  async findById(id: number): Promise<ResponseSenderDto | null> {
    return await this.prisma.sender.findUnique({
      where: {
        sId: Number(id),
      },
      select: {
        sId: true,
        fullname: true,
        position: true,
        department: true,
        createdAt: true,
        cardId: true,
        wishId: true,
        festivalId: true,
        card: {
          select: {
            cId: true,
            imageCard: true,
          },
        },
        wish: {
          select: {
            wId: true,
            wishWord: true,
          },
        },
        festival: {
          select: {
            fId: true,
            festivalName: true,
          },
        },
      },
    });
  }

  // update(id: number, updateSenderDto: UpdateSenderDto) {
  //   return `This action updates a #${id} sender`;
  // }

  remove(id: number) {
    return `This action removes a #${id} sender`;
  }
}
