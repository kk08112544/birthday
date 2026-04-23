import { Injectable } from '@nestjs/common';
// import { CreateFestivalDto } from './dto/create-festival.dto';
// import { UpdateFestivalDto } from './dto/update-festival.dto';
import { ResponseFestivalDto } from './dto/response-festival.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FestivalRepositories {
  constructor(private prisma: PrismaService) {}
  // create(createFestivalDto: CreateFestivalDto) {
  //   return 'This action adds a new festival';
  // }

  async findAll(): Promise<ResponseFestivalDto[]> {
    const result = await this.prisma.festival.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        wisher: {
          where: {
            deletedAt: null,
          },
        },
        card: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
    return result as unknown as ResponseFestivalDto[];
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
