import { IsNotEmpty } from 'class-validator';

export class CreateIgnoreDto {
  @IsNotEmpty()
  word!: string;
}
