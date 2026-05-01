import { Injectable } from '@nestjs/common';
import { CreateSenderDto } from './dto/create-sender.dto';
// import { UpdateSenderDto } from './dto/update-sender.dto';
import { SenderRepositories } from './sender.repositories';
import { UnpoliteRepositories } from 'src/unpolite/unpolite.repositories';
import { PaginationSenderDto } from './dto/pagination-sender.dto';

import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
import { ExceptionsService } from 'src/common/exception/exception.service';

@Injectable()
export class SenderService {
  constructor(
    private readonly senderRepositories: SenderRepositories,
    private readonly unpoliteRepositories: UnpoliteRepositories,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async create(createSenderDto: CreateSenderDto) {
    const check = await this.unpoliteRepositories.findWord(createSenderDto);
    if (check) {
      // return {
      //   status: STATUS.ERROR,
      //   message: MESSAGE.SENDER.BAD_WORD_FOUND,
      // };
      this.exceptionsService.throwFoundBadWord();
    }
    const data = await this.senderRepositories.create(createSenderDto);
    return {
      sender: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.SENDER.CREATE_SUCCESS,
    };
  }

  async findAll() {
    const data = await this.senderRepositories.findAll();
    return {
      sender: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.SENDER.GET_SUCCESS,
    };
  }

  async findMany(id: number, dto: PaginationSenderDto) {
    const { page, limit, search, fullname, position, department, month, year } =
      dto;

    const result = await this.senderRepositories.findManyPaginated(id, {
      page,
      limit,
      search,
      fullname,
      position,
      department,
      month,
      year,
    });
    return {
      sender: result,
      action: STATUS.SUCCESS,
      message: MESSAGE.SENDER.GET_SUCCESS,
    };
  }

  async findById(id: number) {
    const data = await this.senderRepositories.findById(id);
    if (!data) {
      // return {
      //   status: STATUS.ERROR,
      //   message: MESSAGE.SENDER.NOT_FOUND,
      // };
      this.exceptionsService.throwSenderNotFound();
    }
    return {
      sender: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.SENDER.GET_SUCCESS,
    };
  }

  // update(id: number, updateSenderDto: UpdateSenderDto) {
  //   return `This action updates a #${id} sender`;
  // }

  remove(id: number) {
    return `This action removes a #${id} sender`;
  }
}
