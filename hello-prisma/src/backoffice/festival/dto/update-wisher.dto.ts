import { IsNumber, IsOptional, IsString } from 'class-validator';
// IsNumber,
export class UpdateWisherDto {
  @IsNumber()
  @IsOptional()
  wId!: number;

  @IsString()
  @IsOptional()
  wishWord!: string;
}
