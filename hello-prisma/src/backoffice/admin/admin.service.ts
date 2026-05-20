import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
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
    const checkFirstName = await this.adminRepositories.checkFirstName(
      createAdminDto.firstName,
    );
    if (checkFirstName) {
      this.exceptionService.throwFirstNameAlreadyExits();
    }
    const findMax = await this.adminRepositories.findMax();
    const hashedPassword = await hashPassword(createAdminDto.password);
    const nextId = (findMax ?? 0) + 1;
    const userName = `admin${nextId}`;

    const checkUsername = await this.adminRepositories.checkUsername(userName);
    if (checkUsername) {
      // ✅ มีอยู่แล้ว → throw
      this.exceptionService.throwUserNameAlreadyExits();
    }

    createAdminDto.userName = userName;
    createAdminDto.password = hashedPassword;

    const checkEmail = await this.adminRepositories.checkEmail(
      createAdminDto.email,
    );
    if (checkEmail) {
      // ✅ มีอยู่แล้ว → throw
      this.exceptionService.throwEmailAlreadyExits();
    }

    const checkPhoneNumber = await this.adminRepositories.checkphoneNumber(
      createAdminDto.phoneNumber,
    );

    if (checkPhoneNumber) {
      this.exceptionService.throwPhoneNumberAlreadyExits();
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
      admin: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.ADMIN.GET_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const check = await this.adminRepositories.findById(id);

    if (!check) {
      this.exceptionService.throwAdminNotFound();
    }

      if(check.role==='superAdmin'){
      this.exceptionService.throwSuperAdminNotExceptedChange();
    }
    const checkFirstName = await this.adminRepositories.checkFirstName(
      String(updateAdminDto.firstName),
    );
    if (checkFirstName) {
      if (Number(checkFirstName.uId) !== id) {
        this.exceptionService.throwFirstNameAlreadyExits();
      }
    }

    const checkEmail = await this.adminRepositories.checkEmail(
      String(updateAdminDto.email),
    );
    if (checkEmail) {
      if (id !== Number(checkEmail.uId)) {
        this.exceptionService.throwEmailAlreadyExits();
      }
    }

    const checkPhoneNumber = await this.adminRepositories.checkphoneNumber(
      String(updateAdminDto.phoneNumber),
    );
    if (checkPhoneNumber) {
      if (Number(checkPhoneNumber.uId) !== id) {
        this.exceptionService.throwPhoneNumberAlreadyExits();
      }
    }

    const payload: UpdateAdminDto = {
      ...updateAdminDto,
    };

  

    const data = await this.adminRepositories.update(id, payload);

    return {
      admin: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.ADMIN.UPDATE_SUCCESS,
    };
  }


  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto){
     const check = await this.adminRepositories.findById(id);

    if (!check) {
      this.exceptionService.throwAdminNotFound();
    }
 if(check.role==='superAdmin'){
      this.exceptionService.throwSuperAdminNotExceptedChange();
    }
  
     const hashedPassword = await hashPassword(updatePasswordDto.password);
     const data = await this.adminRepositories.updatePassword(id, hashedPassword);
    return {
      admin: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.ADMIN.UPDATE_PASSWORD_SUCCESS, // ใช้ตัวแปร MESSAGE
    };


  }

  async delete(id: number) {
    const check = await this.adminRepositories.findById(id);
    if (!check) {
      this.exceptionService.throwAdminNotFound();
    }

     if(check.role==='superAdmin'){
      this.exceptionService.throwSuperAdminNotExceptedChange();
    }
    const data = await this.adminRepositories.delete(id);
    return {
      admin: data,
      action: STATUS.SUCCESS, // ใช้ตัวแปร STATUS
      message: MESSAGE.ADMIN.DELETE_SUCCESS, // ใช้ตัวแปร MESSAGE
    };
  }
}
