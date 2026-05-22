import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseAdminDto } from './dto/response-admin.dto';
import { ResponseAdminLog } from './dto/response-adminlog.dto';
import { PaginationAdminDto } from './dto/pagination-admin.dto';
import { PaginationAdminLogDto } from './dto/pagination-adminlog.dto';
import {
  calculatePagination,
  createPaginatedResult,
} from 'src/common/pagination/paginate.util';
import { PaginatedResult } from 'src/common/pagination/paginate.interface';
import { Prisma } from '@prisma/client';

import { paginate } from 'src/common/pagination/paginate.util';
import * as fs from 'fs/promises'; // เปลี่ยนเป็นดึงเวอร์ชัน promises มาใช้งาน
import * as path from 'path';

@Injectable()
export class AdminRepositories {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto): Promise<ResponseAdminDto> {
    const data = await this.prisma.user.create({
      data: {
        ...createAdminDto,
      },
      select: {
        uId: true,
        firstName: true,
        userName: true,
        role: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return data;
  }

  async findAll(): Promise<ResponseAdminDto[]> {
    const data = await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        uId: true,
        firstName: true,
        userName: true,
        role: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return data;
  }

  async getLog(dto: PaginationAdminLogDto): Promise<ResponseAdminLog> {
    const page = Number(dto.page) || 1;
    const limit = Number(dto.limit) || 10;

    const { search, action } = dto;

    const logPath = path.resolve('logs/admin.log');

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
      ...createPaginatedResult(data, entries.length, { page, limit }),
      createCount,
      updateCount,
      deleteCount,
    };
  }

  async findById(id: number): Promise<ResponseAdminDto | null> {
    const data = await this.prisma.user.findUnique({
      where: {
        uId: Number(id),
        deletedAt: null,
      },
      select: {
        uId: true,
        firstName: true,
        userName: true,
        role: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return data;
  }

  async findManyPaginated(
    options: PaginationAdminDto,
  ): Promise<PaginatedResult<ResponseAdminDto>> {
    const whereCondition: Prisma.UserWhereInput = {
      deletedAt: null,
    };
    if (options.search) {
      whereCondition.OR = [
        {
          firstName: {
            contains: options.search,
          },
        },
      ];
    }
    const queryFn = (skip: number, take: number) => {
      return this.prisma.user.findMany({
        where: whereCondition,
        skip, // ✅ ต้องมีค่าเสมอ
        take, // ✅ ต้องมีค่าเสมอ
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          uId: true,
          firstName: true,
          userName: true,
          role: true,
          phoneNumber: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
    };
    const countFn = () => {
      return this.prisma.user.count({
        where: whereCondition,
      });
    };

    return paginate(queryFn, countFn, options);
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<ResponseAdminDto> {
    const data = await this.prisma.user.update({
      where: {
        uId: Number(id),
        deletedAt: null,
      },
      data: {
        ...updateAdminDto,
      },
      select: {
        uId: true,
        firstName: true,
        userName: true,
        role: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return data;
  }

  async updatePassword(
    id: number,
    hashPassword: string,
  ): Promise<ResponseAdminDto> {
    const data = await this.prisma.user.update({
      where: {
        uId: Number(id),
        deletedAt: null,
      },
      data: {
        password: hashPassword,
      },
      select: {
        uId: true,
        firstName: true,
        userName: true,
        role: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return data;
  }

  async delete(id: number): Promise<ResponseAdminDto> {
    const data = await this.prisma.user.update({
      where: {
        uId: Number(id),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        uId: true,
        firstName: true,
        userName: true,
        role: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return data;
  }

  async findMax(): Promise<number | null> {
    const data = await this.prisma.user.aggregate({
      _max: {
        uId: true,
      },
    });

    return data._max.uId;
  }

  async checkFirstName(firstName: string): Promise<ResponseAdminDto | null> {
    const inputSuffix = firstName.split('-')[1]?.trim();

    if (!inputSuffix) {
      return null;
    }

    const users = await this.prisma.user.findMany({
      where: {
        deletedAt: null,
        firstName: {
          contains: '-',
        },
      },
    });

    const duplicate = users.find((user) => {
      const suffix = user.firstName.split('-')[1]?.trim();
      return suffix === inputSuffix;
    });

    return duplicate || null;
  }

  async checkUsername(userName: string): Promise<boolean> {
    const data = await this.prisma.user.findFirst({
      where: {
        userName: userName,
        deletedAt: null,
      },
    });
    return !!data;
  }

  async checkEmail(email: string): Promise<ResponseAdminDto | null> {
    const data = await this.prisma.user.findFirst({
      where: {
        email: email,
        deletedAt: null,
      },
    });
    return data;
  }

  async checkphoneNumber(
    phoneNumber: string,
  ): Promise<ResponseAdminDto | null> {
    const data = await this.prisma.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
        deletedAt: null,
      },
    });
    return data;
  }
}
