import { Injectable } from '@nestjs/common';
import { CreateIgnoreDto } from './dto/create-ignore.dto';
import { UpdateIgnoreDto } from './dto/update-ignore.dto';
import { PaginationIgnoreLogDto } from './dto/pagination-ignorelog.dto';
import { AdminIgnoreRepositories } from './ignore-repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { PaginationIgnoreDto } from './dto/pagination-ignore.dto';
import { AppLoggerService } from 'src/common/logger/app-logger.service';

@Injectable()
export class AdminIgnoreService {
  constructor(
    private readonly adminIgnoreRepositories: AdminIgnoreRepositories,
    private readonly exceptionsService: ExceptionsService,
    private loggerService: AppLoggerService,
  ) {}
  async create(createIgnoreDto: CreateIgnoreDto, createdBy: number) {
    const check = await this.adminIgnoreRepositories.exits(
      String(createIgnoreDto.word),
    );
    if (check) {
      this.exceptionsService.throwIgnoreWordAlreadyExits();
    }
    const data = await this.adminIgnoreRepositories.create(
      createIgnoreDto,
      createdBy,
    );
    console.log('=== BEFORE LOG ==='); // เพิ่มตรงนี้
    this.loggerService.create('IGNORE', { ...data, createdBy });
    console.log('=== AFTER LOG ==='); // เพิ่มตรงนี้
    return {
      ignore: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.IGNORE.CREATE_SUCCESS,
    };
  }

  async findAll() {
    const data = await this.adminIgnoreRepositories.findAll();

    return {
      ignore: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.IGNORE.GET_SUCCESS,
    };
  }

  async getLog(paginationDto: PaginationIgnoreLogDto) {
    const result = await this.adminIgnoreRepositories.getLog(paginationDto);
    console.log(result);
    return {
      ignore: result,
      action: STATUS.SUCCESS,
      message: MESSAGE.IGNORE.GET_SUCCESS,
    };
  }

  async findById(id: number) {
    const data = await this.adminIgnoreRepositories.findById(id);
    if (!data) {
      this.exceptionsService.throwIgnoreWordNotFound();
    }
    return {
      ignore: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.IGNORE.GET_SUCCESS,
    };
  }

  async findMany(dto: PaginationIgnoreDto) {
    const data = await this.adminIgnoreRepositories.findManyPaginated(dto);

    return {
      ignore: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.IGNORE.GET_SUCCESS,
    };
  }

  async update(
    id: number,
    updateIgnoreDto: UpdateIgnoreDto,
    updatedBy: number,
  ) {
    const check = await this.adminIgnoreRepositories.findById(id);
    if (!check) {
      this.exceptionsService.throwIgnoreWordNotFound();
    }
    const data = await this.adminIgnoreRepositories.update(
      id,
      updateIgnoreDto,
      updatedBy,
    );
    this.loggerService.update('IGNORE', { ...check }, { ...data });
    return {
      ignore: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.IGNORE.UPDATE_SUCCESS,
    };
  }

  async delete(id: number, deletedBy: number) {
    const check = await this.adminIgnoreRepositories.findById(id);
    if (!check) {
      this.exceptionsService.throwIgnoreWordNotFound();
    }
    const data = await this.adminIgnoreRepositories.delete(id, deletedBy);
    this.loggerService.delete('IGNORE', data);
    return {
      ignore: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.IGNORE.DELETE_SUCCESS,
    };
  }
}
