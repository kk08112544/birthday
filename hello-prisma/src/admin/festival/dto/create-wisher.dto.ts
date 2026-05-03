import { IsNotEmpty, IsString } from 'class-validator';
// IsNumber,
export class CreateWisherDto {
  @IsString()
  @IsNotEmpty()
  wishWord!: string;

  // @IsNumber()
  // @IsNotEmpty()
  // festivalId!: number;
}
