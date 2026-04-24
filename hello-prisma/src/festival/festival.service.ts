import { Injectable } from '@nestjs/common';

import { FestivalRepositories } from './festival.repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
@Injectable()
export class FestivalService {
  constructor(private festivalRepositories: FestivalRepositories) {}

  async findAll() {
    const data = await this.festivalRepositories.findAll();
    return {
      festival: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.FESTIVAL.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} festival`;
  }

  remove(id: number) {
    return `This action removes a #${id} festival`;
  }
}
