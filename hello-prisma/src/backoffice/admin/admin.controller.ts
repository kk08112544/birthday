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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PaginationAdminDto } from './dto/pagination-admin.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt/jwt-auth.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Roles('superAdmin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('backoffice/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('all')
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.adminService.findById(id);
  }

  @Get()
  findMany(@Query() paginationDto: PaginationAdminDto) {
    return this.adminService.findMany(paginationDto);
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  update(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Patch('password/:id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  updatePassword(@Param('id') id: number, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.adminService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.adminService.delete(id);
  }
}
