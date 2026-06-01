import { Injectable } from '@nestjs/common';
import { CreateIgnoreDto } from './dto/create-ignore.dto';
import { UpdateIgnoreDto } from './dto/update-ignore.dto';
import { ResponseIgnoreDto } from './dto/response-ignore.dto';
import { ResponseIgnoreLog } from './dto/response-ignorelog.dto';
import {
  calculatePagination,
  createPaginatedResult,
} from 'src/common/pagination/paginate.util';
import { PrismaService } from 'src/prisma.service';
import { PaginationIgnoreLogDto } from './dto/pagination-ignorelog.dto';
import { PaginationIgnoreDto } from './dto/pagination-ignore.dto';
import { PaginatedResult } from 'src/common/pagination/paginate.interface';
import { Prisma } from '@prisma/client';
import { paginate } from 'src/common/pagination/paginate.util';
import * as fs from 'fs/promises'; // เปลี่ยนเป็นดึงเวอร์ชัน promises มาใช้งาน
import * as path from 'path';

const userSelect = {
  uId: true,
  firstName: true,
  userName: true,
};

const ignoreSelect = {
  igId: true,
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
export class AdminIgnoreRepositories {
  constructor(private readonly prisma: PrismaService) {}
  async create(createIgnoreDto: CreateIgnoreDto, createdBy: number) {
    const data = await this.prisma.ignore.create({
      data: { ...createIgnoreDto, createdBy },
      select: ignoreSelect,
    });
    return data;
  }

  async findAll(): Promise<ResponseIgnoreDto[]> {
    const data = await this.prisma.ignore.findMany({
      where: {
        deletedAt: null,
      },
      select: ignoreSelect,
    });
    return data;
  }

  async findById(id: number): Promise<ResponseIgnoreDto | null> {
    const data = await this.prisma.ignore.findUnique({
      where: {
        igId: Number(id),
        deletedAt: null,
      },
      select: ignoreSelect,
    });
    return data;
  }

  async getLog(dto: PaginationIgnoreLogDto): Promise<ResponseIgnoreLog> {
    const { page, limit, search, action } = dto;

    const logPath = path.resolve('logs/ignore.log');

    let raw = '';

    try {
      raw = await fs.readFile(logPath, 'utf-8');
    } catch {
      raw = '';
    }

    let entries = raw
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (search) {
      const q = search.toLowerCase();

      entries = entries.filter((l) => l.toLowerCase().includes(q));
    }

    const createCount = entries.filter((l) => l.includes('[CREATE]')).length;

    const updateCount = entries.filter((l) => l.includes('[UPDATE]')).length;

    const deleteCount = entries.filter((l) => l.includes('[DELETE]')).length;

    if (action) {
      entries = entries.filter((l) => l.includes(`[${action}]`));
    }

    entries.reverse();

    const { skip, take } = calculatePagination({
      page,
      limit,
    });

    const data = entries.slice(skip, skip + take);

    return {
      ...createPaginatedResult(data, entries.length, {
        page: Number(page),
        limit: Number(limit),
      }),
      createCount,
      updateCount,
      deleteCount,
    };
  }

  async findManyPaginated(
    options: PaginationIgnoreDto,
  ): Promise<PaginatedResult<ResponseIgnoreDto>> {
    const whereCondition: Prisma.IgnoreWhereInput = { deletedAt: null };

    if (options.search) {
      whereCondition.OR = [{ word: { contains: options.search } }];
    }

    const queryFn = (skip: number, take: number) =>
      this.prisma.ignore.findMany({
        where: whereCondition,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: ignoreSelect,
      });

    const countFn = () => this.prisma.ignore.count({ where: whereCondition });

    return paginate(queryFn, countFn, options);
  }

  async update(
    id: number,
    updateIgnoreDto: UpdateIgnoreDto,
    updatedBy: number,
  ): Promise<ResponseIgnoreDto> {
    const data = await this.prisma.ignore.update({
      where: {
        igId: Number(id),
        deletedAt: null,
      },
      data: {
        ...updateIgnoreDto,
        updatedBy: updatedBy,
      },
      select: ignoreSelect,
    });
    return data;
  }

  async delete(id: number, deletedBy: number): Promise<ResponseIgnoreDto> {
    const data = await this.prisma.ignore.update({
      where: {
        igId: Number(id),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy,
      },
      select: ignoreSelect,
    });
    return data;
  }

  async exits(word: string): Promise<ResponseIgnoreDto | null> {
    const data = await this.prisma.ignore.findFirst({
      where: { word, deletedAt: null },
      select: ignoreSelect,
    });
    return data;
  }
}
