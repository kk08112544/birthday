import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFestivalDto {
  @IsNotEmpty()
  @IsString()
  festivalName!: string;

  @IsNotEmpty()
  @IsString()
  image!: string;
}
