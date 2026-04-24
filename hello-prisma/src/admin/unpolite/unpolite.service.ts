import { Injectable } from '@nestjs/common';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';
import { AdminUnpoliteRepositories } from './unpolite.repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { PaginationUnpoliteDto } from './dto/pagination-unpolite.dto';
@Injectable()
export class AdminUnpoliteService {
  constructor(
    private readonly adminunpoliteRepositories: AdminUnpoliteRepositories,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async create(createUnpoliteDto: CreateUnpoliteDto) {
    const data = await this.adminunpoliteRepositories.create(createUnpoliteDto);
    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.CREATE_SUCCESS,
    };
  }

  async findAll() {
    const data = await this.adminunpoliteRepositories.findAll();
    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.GET_SUCCESS,
    };
  }

  async findById(id: number) {
    const data = await this.adminunpoliteRepositories.findById(id);

    if (!data) {
      this.exceptionsService.throwBadWordNotFound();
    }
    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.GET_SUCCESS,
    };
  }

  async findMany(dto: PaginationUnpoliteDto) {
    const { page, limit, search } = dto;

    const result = await this.adminunpoliteRepositories.findManyPaginated({
      page,
      limit,
      search,
    });
    return {
      sender: result,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.GET_SUCCESS,
    };
  }

  async update(id: number, updateUnpoliteDto: UpdateUnpoliteDto) {
    const check = await this.adminunpoliteRepositories.findById(id);

    if (!check) {
      this.exceptionsService.throwBadWordNotFound();
    }
    const data = await this.adminunpoliteRepositories.update(
      id,
      updateUnpoliteDto,
    );
    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.UPDATE_SUCCESS,
    };
  }

  async delete(id: number) {
    const check = await this.adminunpoliteRepositories.findById(id);

    if (!check) {
      this.exceptionsService.throwBadWordNotFound();
    }

    const data = await this.adminunpoliteRepositories.delete(id);
    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.DELETE_SUCCESS,
    };
  }
}
