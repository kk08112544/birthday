import { Injectable } from '@nestjs/common';
import { CreateWisherDto } from './dto/create-wisher.dto';
import { UpdateWisherDto } from './dto/update-wisher.dto';
import { AdminWisherRepositories } from './wisher.repositories';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { AdminFestivalRepositories } from '../festival/festival.repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';

import { PaginationWisherDto } from './dto/pagination-wisher.dto';
@Injectable()
export class AdminWisherService {
  constructor(
    private readonly adminWishRepositories: AdminWisherRepositories,
    private readonly adminFestivalRepositories: AdminFestivalRepositories,
    private readonly exceptionsService: ExceptionsService,
  ) {}
  async create(createWisherDto: CreateWisherDto) {
    const checkFestivalId = await this.adminFestivalRepositories.findById(
      Number(createWisherDto.festivalId),
    );
    if (!checkFestivalId) {
      this.exceptionsService.throwInvalidFestival();
    }
    const data = await this.adminWishRepositories.create(createWisherDto);

    return {
      wisher: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.WISH.CREATE_SUCCESS,
    };
  }

  async findAll() {
    const data = await this.adminWishRepositories.findAll();
    return {
      wisher: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.WISH.GET_SUCCESS,
    };
  }

  async findById(id: number) {
    const data = await this.adminWishRepositories.findById(id);
    if (!data) {
      this.exceptionsService.throwWisherNotFound();
    }
    return {
      wisher: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.WISH.GET_SUCCESS,
    };
  }

  async findMany(dto: PaginationWisherDto) {
    const { page, limit, search } = dto;

    const result = await this.adminWishRepositories.findManyPaginated({
      page,
      limit,
      search,
    });
    return {
      wisher: result,
      action: STATUS.SUCCESS,
      message: MESSAGE.WISH.GET_SUCCESS,
    };
  }

  async update(id: number, updateWisherDto: UpdateWisherDto) {
    const checkId = await this.adminWishRepositories.findById(id);
    if (!checkId) {
      this.exceptionsService.throwWisherNotFound();
    }
    const data = await this.adminWishRepositories.update(id, updateWisherDto);
    return {
      wisher: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.WISH.UPDATE_SUCCESS,
    };
  }

  async delete(id: number) {
    const checkId = await this.adminWishRepositories.findById(id);
    if (!checkId) {
      this.exceptionsService.throwWisherNotFound();
    }
    const data = await this.adminWishRepositories.delete(id);
    return {
      wisher: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.WISH.DELETE_SUCCESS,
    };
  }
}
