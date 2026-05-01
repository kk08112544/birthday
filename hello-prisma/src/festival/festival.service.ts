import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { FestivalRepositories } from './festival.repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
@Injectable()
export class FestivalService {
  constructor(
    private festivalRepositories: FestivalRepositories,
    private exceptionService: ExceptionsService,
  ) {}

  async findAll() {
    const data = await this.festivalRepositories.findAll();
    return {
      festival: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.FESTIVAL.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  async findById(id: number) {
    const data = await this.festivalRepositories.findById(id);
    if (!data) {
      this.exceptionService.throwInvalidFestival();
    }
    return {
      festival: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.FESTIVAL.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }
}
