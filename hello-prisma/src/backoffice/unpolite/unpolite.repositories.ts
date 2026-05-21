import { Injectable } from '@nestjs/common';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';
import { ResponseUnpoliteDto } from './dto/response-unpolite.dto';
import { PaginationUnpoliteDto } from './dto/pagination-unpolite.dto';
import { PaginationUnpoliteLogDto } from './dto/pagination-unpolitelog.dto';
import { PrismaService } from 'src/prisma.service';
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

  async create(
    createUnpoliteDto: CreateUnpoliteDto,
    createdBy: number,
  ): Promise<ResponseUnpoliteDto> {
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

  async findManyPaginated(
    options: PaginationUnpoliteDto,
  ): Promise<PaginatedResult<ResponseUnpoliteDto>> {
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

  async getLog(dto: PaginationUnpoliteLogDto) {
    const { page, limit, search, action } = dto;

    const logPath = path.resolve('logs/unpolite.log');
    let raw = '';
    try {
      // ใช้ await fs.readFile เพื่อแก้อาการแจ้งเตือนของ ESLint
      raw = await fs.readFile(logPath, 'utf-8');
    } catch {
      raw = '';
    }

    // ทำความสะอาดและแยกบรรทัด Log เพียงรอบเดียว (Single-source of truth)
    const allEntries = raw
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    // นับสถิติจากอาเรย์ต้นฉบับก่อนโดน filter
    const createCount = allEntries.filter((l) => l.includes('[CREATE]')).length;
    const updateCount = allEntries.filter((l) => l.includes('[UPDATE]')).length;
    const deleteCount = allEntries.filter((l) => l.includes('[DELETE]')).length;

    // ทำสำเนาชุดข้อมูลเพื่อนำไป filter ต่อตามเงื่อนไขที่ส่งมา
    let entries = [...allEntries];

    if (action) {
      entries = entries.filter((l) => l.includes(`[${action}]`));
    }

    if (search) {
      const q = search.toLowerCase();
      entries = entries.filter((l) => l.toLowerCase().includes(q));
    }

    entries = entries.reverse();

    const total = entries.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const data = entries.slice((page - 1) * limit, page * limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      createCount,
      updateCount,
      deleteCount,
    };
  }

  async update(
    id: number,
    updateUnpoliteDto: UpdateUnpoliteDto,
    updatedBy: number,
  ): Promise<ResponseUnpoliteDto> {
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
