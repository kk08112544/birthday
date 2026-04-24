import { Injectable } from '@nestjs/common';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';
import { ResponseUnpoliteDto } from './dto/response-unpolite.dto';
import { PaginationUnpoliteDto } from './dto/pagination-unpolite.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginatedResult } from 'src/common/pagination/paginate.interface';
import { Prisma } from '@prisma/client';
import { paginate } from 'src/common/pagination/paginate.util';
@Injectable()
export class AdminUnpoliteRepositories {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUnpoliteDto: CreateUnpoliteDto,
  ): Promise<ResponseUnpoliteDto> {
    const unpolite = await this.prisma.unpolite.create({
      data: createUnpoliteDto,
      select: {
        upId: true,
        word: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return unpolite;
  }

  async findAll(): Promise<ResponseUnpoliteDto[]> {
    const data = await this.prisma.unpolite.findMany({
      where: {
        deletedAt: null,
      },
    });
    return data;
  }

  async findById(id: number): Promise<ResponseUnpoliteDto | null> {
    const data = await this.prisma.unpolite.findUnique({
      where: {
        upId: Number(id),
        deletedAt: null,
      },
    });
    return data;
  }

  async findManyPaginated(
    options: PaginationUnpoliteDto,
  ): Promise<PaginatedResult<ResponseUnpoliteDto>> {
    const whereCondition: Prisma.UnpoliteWhereInput = {
      deletedAt: null,
    };
    if (options.search) {
      whereCondition.OR = [
        {
          word: {
            contains: options.search,
          },
        },
      ];
    }
    const queryFn = (skip: number, take: number) => {
      return this.prisma.unpolite.findMany({
        where: whereCondition,
        skip, // ✅ ต้องมีค่าเสมอ
        take, // ✅ ต้องมีค่าเสมอ
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          upId: true,
          word: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
    };
    const countFn = () => {
      return this.prisma.unpolite.count({
        where: whereCondition,
      });
    };

    return paginate(queryFn, countFn, options);
  }

  async update(
    id: number,
    updateUnpoliteDto: UpdateUnpoliteDto,
  ): Promise<ResponseUnpoliteDto> {
    const data = await this.prisma.unpolite.update({
      where: {
        upId: Number(id),
        deletedAt: null,
      },
      data: {
        ...updateUnpoliteDto,
      },
      select: {
        upId: true,
        word: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return data;
  }

  async delete(id: number): Promise<ResponseUnpoliteDto> {
    const data = await this.prisma.unpolite.update({
      where: {
        upId: Number(id),
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        upId: true,
        word: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return data;
  }
}
