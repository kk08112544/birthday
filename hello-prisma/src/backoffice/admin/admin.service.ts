import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PaginationAdminDto } from './dto/pagination-admin.dto';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
import { AdminRepositories } from './admin.repositories';
import { hashPassword } from 'src/common/utils/bcrypt.util';

@Injectable()
export class AdminService {
  constructor(
    private adminRepositories: AdminRepositories,
    private exceptionService: ExceptionsService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
  const findMax = await this.adminRepositories.findMax();
  const hashedPassword = await hashPassword(createAdminDto.password);
  const nextId = (findMax ?? 0) + 1;
  const userName = `admin${nextId}`;

  const checkUsername = await this.adminRepositories.checkUsername(userName);
  if (checkUsername) {                                    // ✅ มีอยู่แล้ว → throw
    this.exceptionService.throwUserNameAlreadyExits();
  }

  createAdminDto.userName = userName;
  createAdminDto.password = hashedPassword;

  const checkEmail = await this.adminRepositories.checkEmail(createAdminDto.email);
  if (checkEmail) {                                       // ✅ มีอยู่แล้ว → throw
    this.exceptionService.throwEmailAlreadyExits();
  }

  const data = await this.adminRepositories.create(createAdminDto);
  return {
    admin: data,
    action: STATUS.SUCCESS,
    message: MESSAGE.ADMIN.CREATE_SUCCESS,
  };
}

  async findAll() {
    const data = await this.adminRepositories.findAll();
    return {
      admin: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.ADMIN.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  async findById(id: number) {
    const data = await this.adminRepositories.findById(id);
    if (!data) {
      this.exceptionService.throwAdminNotFound();
    }
    return {
      admin: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.ADMIN.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  async findMany(dto: PaginationAdminDto) {
    const { page, limit, search } = dto;

    const data = await this.adminRepositories.findManyPaginated({
      page,
      limit,
      search,
    });
    return {
      festival: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.ADMIN.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const check = await this.adminRepositories.findById(id);

    if (!check) {
      this.exceptionService.throwAdminNotFound();
    }

    const payload: UpdateAdminDto = {
      ...updateAdminDto,
    };

    if (updateAdminDto.password?.trim()) {
      payload.password = await hashPassword(updateAdminDto.password);
    }

    const data = await this.adminRepositories.update(id, payload);

    return {
      admin: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.ADMIN.UPDATE_SUCCESS,
    };
  }

  async delete(id: number) {
    const data = await this.adminRepositories.delete(id);
    return {
      admin: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.ADMIN.DELETE_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }
}
