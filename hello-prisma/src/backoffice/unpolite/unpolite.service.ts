import { Injectable } from '@nestjs/common';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';
import { AdminUnpoliteRepositories } from './unpolite.repositories';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { PaginationUnpoliteDto } from './dto/pagination-unpolite.dto';
import { PaginationUnpoliteLogDto } from './dto/pagination-unpolitelog.dto';
import { AppLoggerService } from 'src/common/logger/app-logger.service';

@Injectable()
export class AdminUnpoliteService {
  constructor(
    private readonly adminunpoliteRepositories: AdminUnpoliteRepositories,
    private readonly exceptionsService: ExceptionsService,
    private loggerService: AppLoggerService,
  ) {}

  async create(createUnpoliteDto: CreateUnpoliteDto, createdBy: number) {
    console.log('=== CREATE CALLED ==='); // เพิ่มตรงนี้

    const check = await this.adminunpoliteRepositories.exits(
      createUnpoliteDto.word,
    );
    if (check) {
      this.exceptionsService.throwBadWordAlreadyExits();
    }
    const data = await this.adminunpoliteRepositories.create(
      createUnpoliteDto,
      createdBy,
    );
    console.log('=== BEFORE LOG ==='); // เพิ่มตรงนี้
    this.loggerService.create('UNPOLITE', { ...data, createdBy });
    console.log('=== AFTER LOG ==='); // เพิ่มตรงนี้

    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.CREATE_SUCCESS,
    };
  }

  async findAll() {
    const data = await this.adminunpoliteRepositories.findAll();
    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.GET_SUCCESS,
    };
  }

  async findById(id: number) {
    const data = await this.adminunpoliteRepositories.findById(id);

    if (!data) {
      this.exceptionsService.throwBadWordNotFound();
    }
    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.GET_SUCCESS,
    };
  }

  async findMany(dto: PaginationUnpoliteDto) {
    const { page, limit, search } = dto;

    const result = await this.adminunpoliteRepositories.findManyPaginated({
      page,
      limit,
      search,
    });
    return {
      unpolite: result,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.GET_SUCCESS,
    };
  }

  //   async getLog(): Promise<{ log: string }> {
  //   const logPath = path.resolve('logs/unpolite.log'); // ปรับ path ตามจริง
  //   try {
  //     const log = fs.readFileSync(logPath, 'utf-8');
  //     return { log };
  //   } catch {
  //     return { log: '' };
  //   }
  // }
  // async getLog(paginationDto: PaginationUnpoliteDto) {
  //   return this.adminunpoliteRepositories.getLog(paginationDto);
  // }

   async getLog(paginationDto: PaginationUnpoliteLogDto) {
    const result = await this.adminunpoliteRepositories.getLog(paginationDto);
     console.log(result);
      return {
      unpolite: result,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.GET_SUCCESS,
    };
  }

  async update(
    id: number,
    updateUnpoliteDto: UpdateUnpoliteDto,
    updatedBy: number,
  ) {
    const check = await this.adminunpoliteRepositories.findById(id);

    const exits = await this.adminunpoliteRepositories.exits(
      String(updateUnpoliteDto.word),
    );
    if (!check) {
      this.exceptionsService.throwBadWordNotFound();
    }
    if (exits) {
      // this.exceptionsService.throwBadWordAlreadyExits();
      if (Number(exits.upId) !== Number(id)) {
        this.exceptionsService.throwBadWordAlreadyExits();
      }
    }
    const data = await this.adminunpoliteRepositories.update(
      id,
      updateUnpoliteDto,
      updatedBy,
    );
    /* LOG UPDATE */

    // ถูก — แยก oldData และ newData ออกจากกัน
    this.loggerService.update('UNPOLITE', { ...check }, { ...data });
    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.UPDATE_SUCCESS,
    };
  }

  async delete(id: number, deletedBy: number) {
    const check = await this.adminunpoliteRepositories.findById(id);

    if (!check) {
      this.exceptionsService.throwBadWordNotFound();
    }

    const data = await this.adminunpoliteRepositories.delete(id, deletedBy);
    this.loggerService.delete('UNPOLITE', data);

    return {
      unpolite: data,
      action: STATUS.SUCCESS,
      message: MESSAGE.UNPOLITE.DELETE_SUCCESS,
    };
  }
}
