import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAdminDto {
  @Transform(({ value }) => `แอดมิน- ${value}`)
  @IsNotEmpty()
  @IsString()
  // @Matches(/^แอดมิน-\s[ก-๙]{3}$/, {
  //   message: 'firstName ต้องเป็นตัวย่อหน่วยงานภาษาไทย 3 ตัว',
  // })
  @Matches(/^แอดมิน-\s[ก-๙]{2,3}$/, {
    message: 'firstName ต้องเป็นตัวย่อหน่วยงานภาษาไทย',
  })
  firstName!: string;

  @IsNotEmpty()
  @IsOptional()
  userName!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'password ต้องเป็นรูปแบบ yyyy/mm/dd',
  })
  password!: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@ldd\.go\.th$/, {
    message: 'Email must be @ldd.go.th',
  })
  email!: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber!: string;
}
