import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { CreateWisherDto } from './create-wisher.dto';
import { CreateCardDto } from './create-card.dto';
export class CreateFestivalDto {
  @IsNotEmpty()
  @IsString()
  festivalName!: string;

  @IsNotEmpty()
  @IsString()
  image!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  wisher?: CreateWisherDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  card?: CreateCardDto[];
}
