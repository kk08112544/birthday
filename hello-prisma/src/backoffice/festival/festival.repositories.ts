import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseFestivalDto } from './dto/response-festival.dto';
import { PaginationFestivalDto } from './dto/pagination-festival.dto';
import { PaginatedResult } from 'src/common/pagination/paginate.interface';
import { Prisma } from '@prisma/client';
import { paginate } from 'src/common/pagination/paginate.util';

const userSelect = {
  uId: true,
  firstName: true,
  userName: true,
  role: true,
};

@Injectable()
export class AdminFestivalRepositories {
  constructor(private prisma: PrismaService) {}

  async create(
    createFestivalDto: CreateFestivalDto,
    createdBy: number,
  ): Promise<ResponseFestivalDto> {
    const result = await this.prisma.festival.create({
      data: {
        festivalName: createFestivalDto.festivalName,
        image: createFestivalDto.image,
        webName: createFestivalDto.webName,
        logo: createFestivalDto.logo,
        startDate: new Date(createFestivalDto.startDate),
        endDate: new Date(createFestivalDto.endDate),
        createdByUser: { connect: { uId: createdBy } },
        wisher: {
          create:
            createFestivalDto.wisher?.map((w) => ({ wishWord: w.wishWord })) ||
            [],
        },
        card: {
          create:
            createFestivalDto.card?.map((c) => ({ imageCard: c.imageCard })) ||
            [],
        },
      },
      include: {
        createdByUser: { select: userSelect },
        updatedByUser: { select: userSelect },
        deletedByUser: { select: userSelect },
        wisher: true,
        card: true,
      },
    });

    return result as unknown as ResponseFestivalDto;
  }

  async findAll(): Promise<ResponseFestivalDto[]> {
    const result = await this.prisma.festival.findMany({
      where: { deletedAt: null },
      include: {
        wisher: { where: { deletedAt: null } },
        card: { where: { deletedAt: null } },
        createdByUser: { select: userSelect },
        updatedByUser: { select: userSelect },
        deletedByUser: { select: userSelect },
      },
    });

    return result as unknown as ResponseFestivalDto[];
  }

  async findById(id: number): Promise<ResponseFestivalDto | null> {
    return this.prisma.festival.findUnique({
      where: { fId: Number(id), deletedAt: null },
      include: {
        wisher: { where: { deletedAt: null } },
        card: { where: { deletedAt: null } },
        createdByUser: { select: userSelect },
        updatedByUser: { select: userSelect },
        deletedByUser: { select: userSelect },
      },
    }) as unknown as Promise<ResponseFestivalDto | null>;
  }
  async findByCreatorId(
    id: number,
    createdBy: number,
  ): Promise<ResponseFestivalDto | null> {
    return this.prisma.festival.findFirst({
      where: { fId: Number(id), createdBy: Number(createdBy), deletedAt: null },
      include: {
        wisher: { where: { deletedAt: null } },
        card: { where: { deletedAt: null } },
        createdByUser: { select: userSelect },
        updatedByUser: { select: userSelect },
        deletedByUser: { select: userSelect },
      },
    }) as unknown as Promise<ResponseFestivalDto | null>;
  }
  // async findManyPaginated(
  //   options: PaginationFestivalDto,
  // ): Promise<PaginatedResult<ResponseFestivalDto>> {
  //   const whereCondition: Prisma.FestivalWhereInput = { deletedAt: null };

  //   if (options.search) {
  //     whereCondition.OR = [{ festivalName: { contains: options.search } }];
  //   }

  //   const queryFn = (skip: number, take: number) =>
  //     this.prisma.festival.findMany({
  //       where: whereCondition,
  //       skip,
  //       take,
  //       orderBy: { createdAt: 'desc' },
  //       include: {
  //         wisher: { where: { deletedAt: null } },
  //         card: { where: { deletedAt: null } },
  //         createdByUser: { select: userSelect },
  //         updatedByUser: { select: userSelect },
  //         deletedByUser: { select: userSelect },
  //       },
  //     });

  //   const countFn = () => this.prisma.festival.count({ where: whereCondition });

  //   return paginate(queryFn, countFn, options);
  // }
  async findManyPaginated(
    options: PaginationFestivalDto,
  ): Promise<PaginatedResult<ResponseFestivalDto>> {
    const whereCondition: Prisma.FestivalWhereInput = { deletedAt: null };

    if (options.search) {
      whereCondition.OR = [{ festivalName: { contains: options.search } }];
    }

    const queryFn = (skip: number, take: number) =>
      this.prisma.festival.findMany({
        where: whereCondition,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          wisher: { where: { deletedAt: null } },
          card: { where: { deletedAt: null } },
          createdByUser: { select: userSelect },
          updatedByUser: { select: userSelect },
          deletedByUser: { select: userSelect },
        },
      }) as unknown as Promise<ResponseFestivalDto[]>;

    const countFn = () => this.prisma.festival.count({ where: whereCondition });

    return paginate(queryFn, countFn, options) as unknown as Promise<
      PaginatedResult<ResponseFestivalDto>
    >;
  }

  async findMin(): Promise<number | null> {
    const data = await this.prisma.festival.aggregate({
      _min: {
        fId: true,
      },
    });

    return data._min.fId;
  }

  async update(
    id: number,
    updateFestivalDto: UpdateFestivalDto,
    updatedBy: number,
  ): Promise<ResponseFestivalDto> {
    const {
      festivalName,
      image,
      wisher,
      card,
      logo,
      webName,
      startDate,
      endDate,
    } = updateFestivalDto;

    return (await this.prisma.$transaction(async (tx) => {
      const existing = await tx.festival.findUnique({
        where: { fId: Number(id) },
      });

      if (!existing || existing.deletedAt) {
        throw new Error('Festival not found');
      }

      if (wisher) {
        const wisherIdsToKeep = wisher.filter((w) => w.wId).map((w) => w.wId);

        await tx.wisher.updateMany({
          where: {
            festivalId: Number(id),
            wId: { notIn: wisherIdsToKeep },
            deletedAt: null,
          },
          data: { deletedAt: new Date() },
        });

        for (const wData of wisher) {
          if (wData.wId) {
            await tx.wisher.update({
              where: { wId: wData.wId },
              data: { wishWord: wData.wishWord },
            });
          } else {
            await tx.wisher.create({
              data: { wishWord: wData.wishWord, festivalId: Number(id) },
            });
          }
        }
      }

      if (card) {
        const cardIdsToKeep = card.filter((c) => c.cId).map((c) => c.cId);

        await tx.card.updateMany({
          where: {
            festivalId: Number(id),
            cId: { notIn: cardIdsToKeep },
            deletedAt: null,
          },
          data: { deletedAt: new Date() },
        });

        for (const cData of card) {
          if (cData.cId) {
            await tx.card.update({
              where: { cId: cData.cId },
              data: { imageCard: cData.imageCard },
            });
          } else {
            await tx.card.create({
              data: { imageCard: cData.imageCard, festivalId: Number(id) },
            });
          }
        }
      }

      return (await tx.festival.update({
        where: { fId: Number(id) },
        data: {
          festivalName,
          image,
          logo,
          webName,
          updatedBy,
          ...(startDate && { startDate: new Date(startDate) }),
          ...(endDate && { endDate: new Date(endDate) }),
        },
        include: {
          wisher: { where: { deletedAt: null } },
          card: { where: { deletedAt: null } },
          createdByUser: { select: userSelect },
          updatedByUser: { select: userSelect },
          deletedByUser: { select: userSelect },
        },
      })) as unknown as ResponseFestivalDto;
    })) as unknown as ResponseFestivalDto;
  }

  // async delete(id: number, deletedBy: number): Promise<ResponseFestivalDto> {
  //   return this.prisma.festival.update({
  //     where: { fId: Number(id) },
  //     data: {
  //       deletedAt: new Date(),
  //       deletedBy,
  //       wisher: {
  //         updateMany: {
  //           where: { festivalId: Number(id), deletedAt: null },
  //           data: { deletedAt: new Date() },
  //         },
  //       },
  //       card: {
  //         updateMany: {
  //           where: { festivalId: Number(id), deletedAt: null },
  //           data: { deletedAt: new Date() },
  //         },
  //       },
  //     },
  //     include: {
  //       wisher: true,
  //       card: true,
  //       createdByUser: { select: userSelect },
  //       updatedByUser: { select: userSelect },
  //       deletedByUser: { select: userSelect },
  //     },
  //   });
  // }
  async delete(id: number, deletedBy: number): Promise<ResponseFestivalDto> {
    return this.prisma.festival.update({
      where: { fId: Number(id) },
      data: {
        deletedAt: new Date(),
        deletedBy,
        wisher: {
          updateMany: {
            where: { festivalId: Number(id), deletedAt: null },
            data: { deletedAt: new Date() },
          },
        },
        card: {
          updateMany: {
            where: { festivalId: Number(id), deletedAt: null },
            data: { deletedAt: new Date() },
          },
        },
      },
      include: {
        wisher: true,
        card: true,
        createdByUser: { select: userSelect },
        updatedByUser: { select: userSelect },
        deletedByUser: { select: userSelect },
      },
    }) as unknown as Promise<ResponseFestivalDto>;
  }

  async findDeleteExits(id: number): Promise<boolean> {
    const data = await this.prisma.festival.findFirst({
      where: { fId: Number(id), deletedAt: null, isDelete: true },
      include: {
        wisher: { where: { deletedAt: null } },
        card: { where: { deletedAt: null } },
      },
    });
    return !!data;
  }
}
