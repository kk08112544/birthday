import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PaginationFestivalDto } from './dto/pagination-festival.dto';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
import { AdminFestivalRepositories } from './festival.repositories';
import { AppLoggerService } from 'src/common/logger/app-logger.service';
@Injectable()
export class AdminFestivalService {
  constructor(
    private adminFestivalRepositories: AdminFestivalRepositories,
    private exceptionService: ExceptionsService,
    private loggerService: AppLoggerService,
  ) {}
  async create(createFestivalDto: CreateFestivalDto, createdBy: number) {
    // createFestivalDto.createdBy = createdBy;

    const data = await this.adminFestivalRepositories.create(
      createFestivalDto,
      createdBy,
    );

    console.log('=== BEFORE LOG ==='); // เพิ่มตรงนี้
    this.loggerService.create('FESTIVAL', { ...data, createdBy });
    console.log('=== AFTER LOG ==='); // เพิ่มตรงนี้

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

  async update(
    id: number,
    updateFestivalDto: UpdateFestivalDto,
    updatedBy: number,
  ) {
    const checkId = await this.adminFestivalRepositories.findById(id);

    if (!checkId) {
      this.exceptionService.throwFestivalNotFound();
    }
    if (Number(checkId.createdBy) !== updatedBy) {
      if (checkId.createdByUser.role !== 'superAdmin') {
        this.exceptionService.throwFestivalNotExceptedChange();
      }
    }

    const data = await this.adminFestivalRepositories.update(
      id,
      updateFestivalDto,
      updatedBy,
    );
    console.log(data);
    this.loggerService.update(
      'FESTIVAL',
      { ...checkId },
      { ...data, updatedBy },
    );
    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.UPDATE_SUCCESS,
    };
  }

  async delete(id: number, deletedBy: number) {
    const checkId = await this.adminFestivalRepositories.findById(id);

    if (!checkId) {
      this.exceptionService.throwFestivalNotFound();
    }

    if (!checkId) {
      this.exceptionService.throwFestivalNotFound();
    }
    if (Number(checkId.createdBy) !== deletedBy) {
      if (checkId.createdByUser.role !== 'superAdmin') {
        this.exceptionService.throwFestivalNotExceptedChange();
      }
    }
    const data = await this.adminFestivalRepositories.delete(id, deletedBy);
    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.DELETE_SUCCESS,
    };
  }
}
