import { IsOptional, IsInt, IsString, Min, Max } from 'class-validator';

import { PaginationDto } from '../../common/pagination/paginate.dto';

export class PaginationSenderDto extends PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsString()
  @IsOptional()
  fullname!: string;

  @IsString()
  @IsOptional()
  position!: string;

  @IsString()
  @IsOptional()
  department!: string;
}
