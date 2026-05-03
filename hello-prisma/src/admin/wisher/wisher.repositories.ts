import { Injectable } from '@nestjs/common';
import { CreateWisherDto } from './dto/create-wisher.dto';
import { UpdateWisherDto } from './dto/update-wisher.dto';
import { ResponseWisherDto } from './dto/response-wisher.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationWisherDto } from './dto/pagination-wisher.dto';
import { PaginatedResult } from 'src/common/pagination/paginate.interface';
import { Prisma } from '@prisma/client';
import { paginate } from 'src/common/pagination/paginate.util';
@Injectable()
export class AdminWisherRepositories {
  constructor(private readonly prisma: PrismaService) {}
  async create(createWisherDto: CreateWisherDto): Promise<ResponseWisherDto> {
    const data = await this.prisma.wisher.create({
      data: createWisherDto,
    });
    return data;
  }

  async findAll(): Promise<ResponseWisherDto[]> {
    const data = await this.prisma.wisher.findMany({
      where: {
        deletedAt: null, // เช็คว่า Wisher ยังไม่ถูกลบ
        festival: {
          deletedAt: null, // เช็คว่า Festival ที่ผูกอยู่ก็ยังไม่ถูกลบ
        },
      },
      include: {
        festival: true, // ดึงข้อมูล Festival ทั้งหมดออกมา
      },
    });

    return data as unknown as ResponseWisherDto[];
  }

  async findById(id: number): Promise<ResponseWisherDto> {
    const data = await this.prisma.wisher.findUnique({
      where: {
        wId: Number(id),
        deletedAt: null,
        festival: {
          deletedAt: null, // เช็คว่า Festival ที่ผูกอยู่ก็ยังไม่ถูกลบ
        },
      },
      include: {
        festival: true, // ดึงข้อมูล Festival ทั้งหมดออกมา
      },
    });
    return data as unknown as ResponseWisherDto;
  }

  async findManyPaginated(
    festivalId: number,
    options: PaginationWisherDto,
  ): Promise<PaginatedResult<ResponseWisherDto>> {
    const whereCondition: Prisma.WisherWhereInput = {
      festivalId: Number(festivalId),
      deletedAt: null,
      festival: {
        fId: Number(festivalId),
        deletedAt: null,
      },
    };

    if (options.search) {
      whereCondition.OR = [
        {
          wishWord: {
            contains: options.search,
          },
        },
      ];
    }

    const queryFn = (skip: number, take: number) => {
      return this.prisma.wisher.findMany({
        where: whereCondition,
        skip, // ✅ ต้องมีค่าเสมอ
        take, // ✅ ต้องมีค่าเสมอ
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          festival: true,
        },
      });
    };
    const countFn = () => {
      return this.prisma.wisher.count({
        where: whereCondition,
      });
    };

    return paginate(queryFn, countFn, options);
  }

  async update(
    id: number,
    updateWisherDto: UpdateWisherDto,
  ): Promise<ResponseWisherDto> {
    // 1. ส่งข้อมูลที่ต้องการอัปเดตใน data
    const data = await this.prisma.wisher.update({
      where: {
        wId: Number(id),
        deletedAt: null,
        festival: {
          deletedAt: null,
        },
      },
      data: {
        wishWord: updateWisherDto.wishWord,
      },
      include: {
        festival: true,
      },
    });
    return data as unknown as ResponseWisherDto;
  }

  async delete(id: number): Promise<ResponseWisherDto> {
    const data = await this.prisma.wisher.update({
      where: {
        wId: Number(id),
        deletedAt: null,
        festival: {
          deletedAt: null,
        },
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        festival: true,
      },
    });
    return data;
  }
}
