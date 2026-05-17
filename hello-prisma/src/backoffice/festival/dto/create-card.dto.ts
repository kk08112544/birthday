import { IsNotEmpty, IsString } from 'class-validator';
//  IsNumber

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  imageCard!: string;

  // @IsNumber()
  // @IsNotEmpty()
  // festivalId!: number;
}
