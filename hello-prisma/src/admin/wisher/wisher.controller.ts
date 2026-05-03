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
} from '@nestjs/common';
import { AdminWisherService } from './wisher.service';
import { CreateWisherDto } from './dto/create-wisher.dto';
import { UpdateWisherDto } from './dto/update-wisher.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt/jwt-auth.guard';
import { PaginationWisherDto } from './dto/pagination-wisher.dto';
@UseGuards(JwtAuthGuard)
@Controller('admin/wisher')
export class AdminWisherController {
  constructor(private readonly adminwisherService: AdminWisherService) {}

  @Post()
  create(@Body() createWisherDto: CreateWisherDto) {
    return this.adminwisherService.create(createWisherDto);
  }

  @Get('all')
  findAll() {
    return this.adminwisherService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.adminwisherService.findById(id);
  }

  @Get('/paginate/:festivalId')
  findMany(
    @Param('festivalId') festivalId: number,
    @Query() paginationDto: PaginationWisherDto,
  ) {
    return this.adminwisherService.findMany(festivalId, paginationDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWisherDto: UpdateWisherDto) {
    return this.adminwisherService.update(id, updateWisherDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.adminwisherService.delete(id);
  }
}
