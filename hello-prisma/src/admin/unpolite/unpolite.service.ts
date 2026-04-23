import { Injectable } from '@nestjs/common';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
// import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';
import { AdminUnpoliteRepositories } from './unpolite.repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
@Injectable()
export class AdminUnpoliteService {
  constructor(
    private readonly adminunpoliteRepositories: AdminUnpoliteRepositories,
  ) {}

  async create(createUnpoliteDto: CreateUnpoliteDto) {
    const data = await this.adminunpoliteRepositories.create(createUnpoliteDto);
    return {
      unpolite: data,
      status: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.CREATE_SUCCESS,
    };
  }

  findAll() {
    return `This action returns all unpolite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unpolite`;
  }

  // update(id: number, updateUnpoliteDto: UpdateUnpoliteDto) {
  //   return `This action updates a #${id} unpolite`;
  // }

  remove(id: number) {
    return `This action removes a #${id} unpolite`;
  }
}
