import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PaginationFestivalDto } from './dto/pagination-festival.dto';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
import { AdminFestivalRepositories } from './festival.repositories';

@Injectable()
export class AdminFestivalService {
  constructor(
    private adminFestivalRepositories: AdminFestivalRepositories,
    private exceptionService: ExceptionsService,
  ) {}
  async create(createFestivalDto: CreateFestivalDto, createdBy: number) {
    // createFestivalDto.createdBy = createdBy;

    const data = await this.adminFestivalRepositories.create(
      createFestivalDto,
      createdBy,
    );

    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.CREATE_SUCCESS,
    };
  }
  async findAll() {
    const data = await this.adminFestivalRepositories.findAll();
    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  async findById(id: number) {
    const data = await this.adminFestivalRepositories.findById(id);
    if (!data) {
      this.exceptionService.throwInvalidFestival();
    }
    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  async findMany(dto: PaginationFestivalDto) {
    const { page, limit, search } = dto;

    const data = await this.adminFestivalRepositories.findManyPaginated({
      page,
      limit,
      search,
    });
    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  async findByCreator(createdBy: number, dto: PaginationFestivalDto) {
    const { page, limit, search } = dto;

    const data = await this.adminFestivalRepositories.findManyPaginatedCreator(
      createdBy,
      {
        page,
        limit,
        search,
      },
    );
    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  async update(id: number, updateFestivalDto: UpdateFestivalDto) {
    const checkEndDate = await this.adminFestivalRepositories.findEndDate(id);

    const oldEndDate = checkEndDate ? new Date(checkEndDate) : null;

    const newEndDate = updateFestivalDto.endDate
      ? new Date(updateFestivalDto.endDate)
      : null;

    updateFestivalDto.isEditEndDate = !(
      oldEndDate &&
      newEndDate &&
      oldEndDate < new Date() &&
      oldEndDate.getTime() !== newEndDate.getTime()
    );

    const data = await this.adminFestivalRepositories.update(
      id,
      updateFestivalDto,
    );

    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.UPDATE_SUCCESS,
    };
  }

  async delete(id: number, deletedBy: number) {
    const check = await this.adminFestivalRepositories.findDeleteExits(id);
    if (!check) {
      this.exceptionService.throwFestivalDELETEForbidden();
    }
    const data = await this.adminFestivalRepositories.delete(id, deletedBy);
    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.DELETE_SUCCESS,
    };
  }
}
