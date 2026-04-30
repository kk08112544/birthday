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
} from '@nestjs/common';
import { AdminUnpoliteService } from './unpolite.service';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';
import { PaginationUnpoliteDto } from './dto/pagination-unpolite.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/unpolite')
export class AdminUnpoliteController {
  constructor(private readonly adminunpoliteService: AdminUnpoliteService) {}

  @Post()
  create(@Body() createUnpoliteDto: CreateUnpoliteDto) {
    return this.adminunpoliteService.create(createUnpoliteDto);
  }

  @Get('all')
  findAll() {
    return this.adminunpoliteService.findAll();
  }

  @Get()
  findMany(@Query() paginationDto: PaginationUnpoliteDto) {
    return this.adminunpoliteService.findMany(paginationDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.adminunpoliteService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUnpoliteDto: UpdateUnpoliteDto,
  ) {
    return this.adminunpoliteService.update(id, updateUnpoliteDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.adminunpoliteService.delete(id);
  }
}
