import {IsNumber, IsOptional, IsString } from 'class-validator';
//  IsNumber

export class UpdateCardDto {
    @IsOptional()
    @IsNumber()
  cId!: number;

  @IsOptional()
  @IsString()
  imageCard!: string;

  // @IsNumber()
  // @IsNotEmpty()
  // festivalId!: number;
}