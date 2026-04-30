import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  imageCard!: string;

  @IsNumber()
  @IsNotEmpty()
  festivalId!: number;
}
