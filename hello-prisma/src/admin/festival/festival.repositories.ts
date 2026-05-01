import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseFestivalDto } from './dto/response-festival.dto';
import { PaginationFestivalDto } from './dto/pagination-festival.dto';
import { PaginatedResult } from 'src/common/pagination/paginate.interface';
import { Prisma } from '@prisma/client';
import { paginate } from 'src/common/pagination/paginate.util';
@Injectable()
export class AdminFestivalRepositories {
  constructor(private prisma: PrismaService) {}
  async create(
    createFestivalDto: CreateFestivalDto,
  ): Promise<ResponseFestivalDto> {
    const result = await this.prisma.festival.create({
      data: createFestivalDto,
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

  async update(
    id: number,
    updateFestivalDto: UpdateFestivalDto,
  ): Promise<ResponseFestivalDto> {
    const data = await this.prisma.festival.update({
      where: {
        fId: Number(id),
        deletedAt: null,
      },
      data: {
        festivalName: updateFestivalDto.festivalName,
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

  async delete(id: number): Promise<ResponseFestivalDto> {
    const data = await this.prisma.festival.delete({
      where: {
        fId: Number(id),
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
