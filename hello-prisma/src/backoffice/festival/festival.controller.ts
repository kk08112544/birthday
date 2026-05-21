import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminFestivalService } from './festival.service';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PaginationFestivalDto } from './dto/pagination-festival.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt/jwt-auth.guard';
import type { User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Roles('superAdmin', 'admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('backoffice/festival')
export class AdminFestivalController {
  constructor(private readonly adminfestivalService: AdminFestivalService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  create(
    @Body() createFestivalDto: CreateFestivalDto,
    @CurrentUser() user: User,
  ) {
    return this.adminfestivalService.create(createFestivalDto, user.uId);
  }

  @Get('all')
  findAll() {
    return this.adminfestivalService.findAll();
  }

  @Get(':id')
  findฺById(@Param('id') id: number) {
    return this.adminfestivalService.findById(id);
  }

  @Get()
  findMany(@Query() paginationDto: PaginationFestivalDto) {
    return this.adminfestivalService.findMany(paginationDto);
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFestivalDto: UpdateFestivalDto,
    @CurrentUser() user: User,
  ) {
    return this.adminfestivalService.update(id, updateFestivalDto, user.uId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    console.log('deleted :', user.uId);
    return this.adminfestivalService.delete(id, user.uId);
  }
}
