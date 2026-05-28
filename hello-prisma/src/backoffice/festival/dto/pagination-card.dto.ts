import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/paginate.dto';

export class PaginationCardDto extends PaginationDto {
  @IsOptional()
  @IsString()
  festivalName!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  @IsOptional()
  @IsInt()
  year?: number;
}
