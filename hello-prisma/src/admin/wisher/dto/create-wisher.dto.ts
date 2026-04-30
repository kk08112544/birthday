import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWisherDto {
  @IsString()
  @IsNotEmpty()
  wishWord!: string;

  @IsNumber()
  @IsNotEmpty()
  festivalId!: number;
}
