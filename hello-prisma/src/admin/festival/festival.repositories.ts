import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseFestivalDto } from './dto/response-festival.dto';

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
