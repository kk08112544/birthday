import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminFestivalService } from './festival.service';
import { CreateFestivalDto } from './dto/create-festival.dto';
// import { UpdateFestivalDto } from './dto/update-festival.dto';

@Controller('admin/festival')
export class AdminFestivalController {
  constructor(private readonly festivalService: AdminFestivalService) {}

  @Post()
  create(@Body() createFestivalDto: CreateFestivalDto) {
    return this.festivalService.create(createFestivalDto);
  }

  @Get()
  findAll() {
    return this.festivalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.festivalService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFestivalDto: UpdateFestivalDto,
  // ) {
  //   return this.festivalService.update(+id, updateFestivalDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.festivalService.remove(+id);
  }
}
