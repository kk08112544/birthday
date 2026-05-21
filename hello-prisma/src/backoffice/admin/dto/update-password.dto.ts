import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

import { Match } from 'src/common/decorator/match.decorator';

export class UpdatePasswordDto {
  @IsOptional()
  @IsString()
  password!: string;

  @ValidateIf((o: UpdatePasswordDto) => Boolean(o.password))
  @IsNotEmpty({ message: 'กรุณากรอก cpassword' })
  @IsString()
  @Match('password', {
    message: 'password และ confirm password ไม่ตรงกัน',
  })
  cpassword!: string;
}
