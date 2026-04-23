import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnpoliteDto {
  @IsNotEmpty()
  @IsString()
  word!: string;
}
