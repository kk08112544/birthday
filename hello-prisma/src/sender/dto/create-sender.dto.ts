import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSenderDto {
  @IsNotEmpty()
  @IsString()
  fullname!: string;

  @IsNotEmpty()
  @IsString()
  position!: string;

  @IsNotEmpty()
  @IsString()
  department!: string;

  @IsNotEmpty()
  @IsNumber()
  cardId!: number;

  @IsNotEmpty()
  @IsNumber()
  wishId!: number;

  @IsNotEmpty()
  @IsNumber()
  festivalId!: number;
}
