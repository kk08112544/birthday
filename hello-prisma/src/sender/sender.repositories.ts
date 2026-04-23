import { Injectable } from '@nestjs/common';
import { CreateSenderDto } from './dto/create-sender.dto';
// import { UpdateSenderDto } from './dto/update-sender.dto';
import { ResponseSenderDto } from './dto/response-sender.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SenderRepositories {
  constructor(private prisma: PrismaService) {}
  async create(createSenderDto: CreateSenderDto): Promise<ResponseSenderDto> {
    const result = (await this.prisma.sender.create({
      data: {
        ...createSenderDto,
      },
      select: {
        sId: true,
        fullname: true,
        position: true,
        department: true,
        createdAt: true,
        cardId: true,
        wishId: true,
        festivalId: true, // ✅ ดึง festivalId มาแล้ว (ถูกต้อง)

        card: {
          select: {
            cId: true,
            imageCard: true,
          },
        },
        wish: {
          select: {
            wId: true,
            wishWord: true,
          },
        },
        festival: {
          select: {
            fId: true, // ✅ ต้องเพิ่มบรรทัดนี้ เพราะ DTO บังคับว่าต้องมี fId
            festivalName: true,
          },
        },
      },
    })) as ResponseSenderDto;

    return result;
  }
  async findAll(): Promise<ResponseSenderDto[]> {
    const data = (await this.prisma.sender.findMany({
      where: {
        festival: {
          deletedAt: null, // ตรวจสอบว่าเทศกาลที่ผูกอยู่ยังไม่ถูกลบ
        },
      },
      select: {
        sId: true,
        fullname: true,
        position: true,
        department: true,
        cardId: true,
        wishId: true,
        createdAt: true,
        festivalId: true,
        card: {
          select: {
            cId: true,
            imageCard: true,
          },
        },
        wish: {
          select: {
            wId: true,
            wishWord: true,
          },
        },
        festival: {
          select: {
            fId: true,
            festivalName: true,
          },
        },
      },
    })) as ResponseSenderDto[];
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} sender`;
  }

  // update(id: number, updateSenderDto: UpdateSenderDto) {
  //   return `This action updates a #${id} sender`;
  // }

  remove(id: number) {
    return `This action removes a #${id} sender`;
  }
}
