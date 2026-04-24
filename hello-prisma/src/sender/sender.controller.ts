import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SenderService } from './sender.service';
import { CreateSenderDto } from './dto/create-sender.dto';
import { PaginationSenderDto } from './dto/pagination-sender.dto';
// import { UpdateSenderDto } from './dto/update-sender.dto';

@Controller('sender')
export class SenderController {
  constructor(private readonly senderService: SenderService) {}

  @Post()
  create(@Body() createSenderDto: CreateSenderDto) {
    return this.senderService.create(createSenderDto);
  }

  @Get('all')
  findAll() {
    return this.senderService.findAll();
  }

  @Get()
  findMany(@Query() paginationDto: PaginationSenderDto) {
    return this.senderService.findMany(paginationDto);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.senderService.findById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSenderDto: UpdateSenderDto) {
  //   return this.senderService.update(+id, updateSenderDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.senderService.remove(+id);
  }
}
