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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminIgnoreService } from './ignore.service';
import { CreateIgnoreDto } from './dto/create-ignore.dto';
import { UpdateIgnoreDto } from './dto/update-ignore.dto';
import { PaginationIgnoreDto } from './dto/pagination-ignore.dto';
import { PaginationIgnoreLogDto } from './dto/pagination-ignorelog.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt/jwt-auth.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';
import type { User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@Roles('superAdmin', 'admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('backoffice/ignore')
export class AdminIgnoreController {
  constructor(private readonly adminIgnoreService: AdminIgnoreService) {}

  @Post()
  create(@Body() createIgnoreDto: CreateIgnoreDto, @CurrentUser() user: User) {
    return this.adminIgnoreService.create(createIgnoreDto, user.uId);
  }

  @Get('all')
  findAll() {
    return this.adminIgnoreService.findAll();
  }

  @Get('log')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getLog(@Query() paginationDto: PaginationIgnoreLogDto) {
    return this.adminIgnoreService.getLog(paginationDto);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.adminIgnoreService.findById(id);
  }

  @Get()
  findMany(@Query() paginationDto: PaginationIgnoreDto) {
    return this.adminIgnoreService.findMany(paginationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateIgnoreDto: UpdateIgnoreDto,
    @CurrentUser() user: User,
  ) {
    return this.adminIgnoreService.update(id, updateIgnoreDto, user.uId);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @CurrentUser() user: User) {
    return this.adminIgnoreService.delete(id, user.uId);
  }
}
