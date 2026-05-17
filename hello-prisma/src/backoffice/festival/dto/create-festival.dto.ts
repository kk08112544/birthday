import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
  IsDateString,
  IsNumber,
  Matches,
} from 'class-validator';
import { CreateWisherDto } from './create-wisher.dto';
import { CreateCardDto } from './create-card.dto';
export class CreateFestivalDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[ก-๙A-Za-z0-9]+-[ก-๙A-Za-z0-9]{3}-\d{4}$/, {
    message: 'รูปแบบต้องเป็น ชื่อเทศกาล-3ตัวย่อหน่วยงาน-ปี',
  })
  festivalName!: string;

  @IsNotEmpty()
  @IsString()
  image!: string;

  @IsNotEmpty()
  @IsString()
  logo!: string;

  @IsNotEmpty()
  @IsString()
  webName!: string;

  @IsNotEmpty()
  @IsDateString()
  startDate!: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate!: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  wisher?: CreateWisherDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  card?: CreateCardDto[];

  @IsOptional()
  @IsNumber()
  createdBy!: number;
}
