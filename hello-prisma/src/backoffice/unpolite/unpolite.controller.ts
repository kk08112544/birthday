import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminUnpoliteService } from './unpolite.service';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';
import { PaginationUnpoliteDto } from './dto/pagination-unpolite.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt/jwt-auth.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';
import type { User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { PaginationUnpoliteLogDto } from './dto/pagination-unpolitelog.dto';

@Roles('superAdmin', 'admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('backoffice/unpolite')
export class AdminUnpoliteController {
  constructor(private readonly adminunpoliteService: AdminUnpoliteService) {}

  @Post()
  create(
    @Body() createUnpoliteDto: CreateUnpoliteDto,
    @CurrentUser() user: User,
  ) {
    return this.adminunpoliteService.create(createUnpoliteDto, user.uId);
  }

  @Get('all')
  findAll() {
    return this.adminunpoliteService.findAll();
  }

  @Get()
  findMany(@Query() paginationDto: PaginationUnpoliteDto) {
    return this.adminunpoliteService.findMany(paginationDto);
  }

  @Get('log')
  @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
  async getLog(@Query() paginationDto: PaginationUnpoliteLogDto) {
    return this.adminunpoliteService.getLog(paginationDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.adminunpoliteService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUnpoliteDto: UpdateUnpoliteDto,
    @CurrentUser() user: User,
  ) {
    return this.adminunpoliteService.update(id, updateUnpoliteDto, user.uId);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @CurrentUser() user: User) {
    return this.adminunpoliteService.delete(id, user.uId);
  }
}
