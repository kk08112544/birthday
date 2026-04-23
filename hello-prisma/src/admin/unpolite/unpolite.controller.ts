import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminUnpoliteService } from './unpolite.service';
import { CreateUnpoliteDto } from './dto/create-unpolite.dto';
// import { UpdateUnpoliteDto } from './dto/update-unpolite.dto';

@Controller('admin/unpolite')
export class AdminUnpoliteController {
  constructor(private readonly unpoliteService: AdminUnpoliteService) {}

  @Post()
  create(@Body() createUnpoliteDto: CreateUnpoliteDto) {
    return this.unpoliteService.create(createUnpoliteDto);
  }

  @Get()
  findAll() {
    return this.unpoliteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unpoliteService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUnpoliteDto: UpdateUnpoliteDto,
  // ) {
  //   return this.unpoliteService.update(+id, updateUnpoliteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unpoliteService.remove(+id);
  }
}
