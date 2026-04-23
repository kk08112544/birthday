import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
// import { UpdateFestivalDto } from './dto/update-festival.dto';
import { AdminFestivalRepositories } from './festival.repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
@Injectable()
export class AdminFestivalService {
  constructor(private adminFestivalRepositories: AdminFestivalRepositories) {}
  async create(createFestivalDto: CreateFestivalDto) {
    // return 'This action adds a new festival';
    const data = await this.adminFestivalRepositories.create(createFestivalDto);
    return {
      festival: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.FESTIVAL.CREATE_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  findAll() {
    return `This action returns all festival`;
  }

  findOne(id: number) {
    return `This action returns a #${id} festival`;
  }

  // update(id: number, updateFestivalDto: UpdateFestivalDto) {
  //   return `This action updates a #${id} festival`;
  // }

  remove(id: number) {
    return `This action removes a #${id} festival`;
  }
}
