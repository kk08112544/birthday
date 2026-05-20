import { Injectable } from '@nestjs/common';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';
import { ResponseUnpoliteDto } from './dto/response-unpolite.dto';
import { PaginationUnpoliteDto } from './dto/pagination-unpolite.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginatedResult } from 'src/common/pagination/paginate.interface';
import { Prisma } from '@prisma/client';
import { paginate } from 'src/common/pagination/paginate.util';

const userSelect = {
  uId: true,
  firstName: true,
  userName: true,
};

const unpoliteSelect = {
  upId: true,
  word: true,
  createdBy: true,
  updatedBy: true,
  deletedBy: true,
  createdByUser: { select: userSelect },
  updatedByUser: { select: userSelect },
  deletedByUser: { select: userSelect },
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

@Injectable()
export class AdminUnpoliteRepositories {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUnpoliteDto: CreateUnpoliteDto, createdBy: number): Promise<ResponseUnpoliteDto> {
    return this.prisma.unpolite.create({
      data: { ...createUnpoliteDto, createdBy },
      select: unpoliteSelect,
    });
  }

  async findAll(): Promise<ResponseUnpoliteDto[]> {
    return this.prisma.unpolite.findMany({
      where: { deletedAt: null },
      select: unpoliteSelect,
    });
  }

  async findById(id: number): Promise<ResponseUnpoliteDto | null> {
    return this.prisma.unpolite.findUnique({
      where: { upId: Number(id), deletedAt: null },
      select: unpoliteSelect,
    });
  }

  async findManyPaginated(options: PaginationUnpoliteDto): Promise<PaginatedResult<ResponseUnpoliteDto>> {
    const whereCondition: Prisma.UnpoliteWhereInput = { deletedAt: null };

    if (options.search) {
      whereCondition.OR = [{ word: { contains: options.search } }];
    }

    const queryFn = (skip: number, take: number) =>
      this.prisma.unpolite.findMany({
        where: whereCondition,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: unpoliteSelect,
      });

    const countFn = () => this.prisma.unpolite.count({ where: whereCondition });

    return paginate(queryFn, countFn, options);
  }

  async update(id: number, updateUnpoliteDto: UpdateUnpoliteDto, updatedBy: number): Promise<ResponseUnpoliteDto> {
    return this.prisma.unpolite.update({
      where: { upId: Number(id), deletedAt: null },
      data: { ...updateUnpoliteDto, updatedBy },
      select: unpoliteSelect,
    });
  }

  async delete(id: number, deletedBy: number): Promise<ResponseUnpoliteDto> {
    return this.prisma.unpolite.update({
      where: { upId: Number(id) },
      data: { deletedAt: new Date(), deletedBy },
      select: unpoliteSelect,
    });
  }

  async exits(word: string): Promise<ResponseUnpoliteDto | null> {
    return this.prisma.unpolite.findFirst({
      where: { word, deletedAt: null },
      select: unpoliteSelect,
    });
  }

  async findupdateExits(id: number, word: string): Promise<boolean> {
    const data = await this.prisma.unpolite.findFirst({
      where: { upId: Number(id), word, deletedAt: null },
    });
    return !!data;
  }
}