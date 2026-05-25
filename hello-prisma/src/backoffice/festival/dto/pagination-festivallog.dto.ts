import { IsOptional, IsIn } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/paginate.dto';

export class PaginationFestivalLogDto extends PaginationDto {
  @IsOptional()
  @IsIn(['CREATE', 'UPDATE', 'DELETE'])
  action?: 'CREATE' | 'UPDATE' | 'DELETE';
}
