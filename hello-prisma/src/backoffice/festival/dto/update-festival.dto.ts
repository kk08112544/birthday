import { Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { UpdateCardDto } from './update-card.dto';
import { UpdateWisherDto } from './update-wisher.dto';
export class UpdateFestivalDto {
  // @Matches(/^[ก-๙A-Za-z0-9]+-[ก-๙A-Za-z0-9]{2,5}-\d{4}$/, {
  //   message: 'รูปแบบต้องเป็น ชื่อเทศกาล-ตัวย่อหน่วยงาน (2-5) -ปี(4)',
  // })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.replace(/\s/g, '') : value,
  )
  @Matches(/^[ก-๙A-Za-z0-9]+-[ก-๙A-Za-z0-9]{2,5}-\d{4}$/, {
    message: 'รูปแบบต้องเป็น ชื่อเทศกาล-ตัวย่อหน่วยงาน (2-5) -ปี(4)',
  })
  festivalName?: string;
  image?: string;
  logo?: string;
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.replace(/\s/g, '') : value,
  )
  @Matches(/^[ก-๙A-Za-z0-9]+-[ก-๙A-Za-z0-9]{2,5}-\d{4}$/, {
    message: 'รูปแบบต้องเป็น ชื่อเทศกาล-ตัวย่อหน่วยงาน (2-5) -ปี(4)',
  })
  webName?: string;
  startDate?: Date;
  endDate?: Date;
  wisher?: UpdateWisherDto[];
  card?: UpdateCardDto[];
}
