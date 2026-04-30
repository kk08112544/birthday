import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseCardDto } from './dto/response-card.dto';

@Injectable()
export class AdminCardRepositories {
  constructor(private prisma: PrismaService) {}
  async create(createCardDto: CreateCardDto): Promise<ResponseCardDto> {
    const data = await this.prisma.card.create({
      data: createCardDto,
      include: {
        festival: true, // ดึงข้อมูล Festival ทั้งหมดออกมา
      },
    });
    return data;
  }

  async findAll(): Promise<ResponseCardDto[]> {
    const data = await this.prisma.card.findMany({
      where: {
        deletedAt: null,
        festival: {
          deletedAt: null,
        },
      },
      include: {
        festival: true, // ดึงข้อมูล Festival ทั้งหมดออกมา
      },
    });
    return data;
  }

  async findById(id: number): Promise<ResponseCardDto | null> {
    const data = await this.prisma.card.findUnique({
      where: {
        cId: Number(id),
        deletedAt: null,
        festival: {
          deletedAt: null,
        },
      },
      include: {
        festival: true, // ดึงข้อมูล Festival ทั้งหมดออกมา
      },
    });
    return data;
  }

  async update(
    id: number,
    updateCardDto: UpdateCardDto,
  ): Promise<ResponseCardDto> {
    const data = await this.prisma.card.update({
      where: {
        cId: Number(id),
        deletedAt: null,
        festival: {
          deletedAt: null,
        },
      },
      data: {
        imageCard: updateCardDto.imageCard,
      },
      include: {
        festival: true, // ดึงข้อมูล Festival ทั้งหมดออกมา
      },
    });
    return data;
  }

  async delete(id: number): Promise<ResponseCardDto> {
    const data = await this.prisma.card.update({
      where: {
        cId: Number(id),
        deletedAt: null,
        festival: {
          deletedAt: null,
        },
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        festival: true, // ดึงข้อมูล Festival ทั้งหมดออกมา
      },
    });
    return data;
  }
}
