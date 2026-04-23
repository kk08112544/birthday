import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
// import { UpdateFestivalDto } from './dto/update-festival.dto';
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

  findAll() {
    return `This action returns all festival`;
  }

  findOne(id: number) {
    return `This action returns a #${id} festival`;
  }

  // update(id: number, updateFestivalDto: UpdateFestivalDto) {
  //   return `This action updates a #${id} festival`;
  // }

  remove(id: number) {
    return `This action removes a #${id} festival`;
  }
}
