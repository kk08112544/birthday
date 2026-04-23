import { IsOptional, IsDate, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../common/pagination/paginate.dto';

export class RewardPaginationDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;

    // ✅ ใส่ type ของ value ให้แน่ชัด
    const strValue = String(value);
    const [day, month, year] = strValue.split('/').map(Number);

    // ✅ ตรวจสอบค่าก่อนสร้าง Date ป้องกัน NaN
    if (isNaN(day) || isNaN(month) || isNaN(year)) return undefined;

    return new Date(year, month - 1, day);
  })
  @IsDate({ message: 'startDate is invalid' })
  startDate?: Date;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;

    const strValue = String(value);
    const [day, month, year] = strValue.split('/').map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return undefined;

    return new Date(year, month - 1, day);
  })
  @IsDate({ message: 'endDate is invalid' })
  endDate?: Date;

  @IsString()
  @IsOptional()
  fullname!: string;

  @IsString()
  @IsOptional()
  position!: string;

  @IsString()
  @IsOptional()
  department!: string;
}
