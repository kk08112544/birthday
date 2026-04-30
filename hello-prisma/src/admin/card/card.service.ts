import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AdminCardRepositories } from './card.repositories';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
import { AdminFestivalRepositories } from '../festival/festival.repositories';

@Injectable()
export class AdminCardService {
  constructor(
    private readonly admincardRepositories: AdminCardRepositories,
    private readonly adminfestivalRepositories: AdminFestivalRepositories,
    private readonly exceptionsService: ExceptionsService,
  ) {}
  async create(createCardDto: CreateCardDto) {
    const check = await this.adminfestivalRepositories.findById(
      createCardDto.festivalId,
    );
    if (!check) {
      this.exceptionsService.throwInvalidFestival();
    }
    const data = await this.admincardRepositories.create(createCardDto);
    return {
      card: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.CARD.CREATE_SUCCESS,
    };
  }

  async findAll() {
    const data = await this.admincardRepositories.findAll();
    return {
      card: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.CARD.GET_SUCCESS,
    };
  }

  async findById(id: number) {
    const data = await this.admincardRepositories.findById(id);
    if (!data) {
      this.exceptionsService.throwCardNotFound();
    }
    return {
      card: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.CARD.GET_SUCCESS,
    };
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const check = await this.admincardRepositories.findById(id);
    if (!check) {
      this.exceptionsService.throwCardNotFound();
    }
    const data = await this.admincardRepositories.update(id, updateCardDto);
    return {
      card: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.CARD.UPDATE_SUCCES,
    };
  }

  async delete(id: number) {
    const check = await this.admincardRepositories.findById(id);
    if (!check) {
      this.exceptionsService.throwCardNotFound();
    }
    const data = await this.admincardRepositories.delete(id);
    return {
      card: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.CARD.DELETE_SUCCESS,
    };
  }
}
