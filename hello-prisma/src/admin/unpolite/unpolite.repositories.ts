import { Injectable } from '@nestjs/common';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
// import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';
import { ResponseUnpoliteDto } from './dto/response-unpolite.dto';

import { PrismaService } from 'src/prisma.service';
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

  findAll() {
    return `This action returns all unpolite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unpolite`;
  }

  // update(id: number, updateUnpoliteDto: UpdateUnpoliteDto) {
  //   return `This action updates a #${id} unpolite`;
  // }

  remove(id: number) {
    return `This action removes a #${id} unpolite`;
  }
}
