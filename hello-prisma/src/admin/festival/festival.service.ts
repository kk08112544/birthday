import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { AdminFestivalRepositories } from './festival.repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { PaginationFestivalDto } from './dto/pagination-festival.dto';
@Injectable()
export class AdminFestivalService {
  constructor(
    private adminFestivalRepositories: AdminFestivalRepositories,
    private exceptionService: ExceptionsService,
  ) {}
  async create(createFestivalDto: CreateFestivalDto) {
    // const check = await this.adminFestivalRepositories.findAll();
    // if (check) {
    //   this.exceptionService.throwFestivalConflict();
    // }
    // return 'This action adds a new festival';
    const data = await this.adminFestivalRepositories.create(createFestivalDto);
    return {
      festival: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.FESTIVAL.CREATE_SUCCESS, // ใช้ตัวแปร MESSAGE
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

  async findMany(dto: PaginationFestivalDto) {
    const { page, limit, search } = dto;

    const result = await this.adminFestivalRepositories.findManyPaginated({
      page,
      limit,
      search,
    });
    return {
      festival: result,
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

  async update(id: number, updateFestivalDto: UpdateFestivalDto) {
    const check = await this.adminFestivalRepositories.findById(id);

    if (!check) {
      this.exceptionService.throwInvalidFestival();
    }

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

  async delete(id: number) {
    const check = await this.adminFestivalRepositories.findById(id);
    if (!check) {
      this.exceptionService.throwInvalidFestival();
    }
    const data = await this.adminFestivalRepositories.delete(id);
    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.FESTIVAL.DELETE_SUCCESS,
    };
  }
}
