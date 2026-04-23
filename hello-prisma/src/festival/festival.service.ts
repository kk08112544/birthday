import { Injectable } from '@nestjs/common';
// import { CreateFestivalDto } from './dto/create-festival.dto';
// import { UpdateFestivalDto } from './dto/update-festival.dto';
import { FestivalRepositories } from './festival.repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
@Injectable()
export class FestivalService {
  constructor(private festivalRepositories: FestivalRepositories) {}
  // create(createFestivalDto: CreateFestivalDto) {
  //   return 'This action adds a new festival';
  // }

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

  // update(id: number, updateFestivalDto: UpdateFestivalDto) {
  //   return `This action updates a #${id} festival`;
  // }

  remove(id: number) {
    return `This action removes a #${id} festival`;
  }
}
