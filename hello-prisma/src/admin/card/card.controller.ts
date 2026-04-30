import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminCardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/card')
export class AdminCardController {
  constructor(private readonly admincardService: AdminCardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.admincardService.create(createCardDto);
  }

  @Get('all')
  findAll() {
    return this.admincardService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.admincardService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto) {
    return this.admincardService.update(id, updateCardDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.admincardService.delete(id);
  }
}
