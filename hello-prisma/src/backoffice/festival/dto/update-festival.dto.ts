import { Matches } from 'class-validator';
import { UpdateCardDto } from './update-card.dto';
import { UpdateWisherDto } from './update-wisher.dto';
export class UpdateFestivalDto {
  @Matches(/^[ก-๙A-Za-z0-9]+-[ก-๙A-Za-z0-9]{3}-\d{4}$/, {
    message: 'รูปแบบต้องเป็น ชื่อเทศกาล-3ตัวย่อหน่วยงาน-ปี',
  })
  festivalName?: string;
  image?: string;
  logo?: string;
  webName?: string;
  startDate?: Date;
  endDate?: Date;
  wisher?: UpdateWisherDto[];
  card?: UpdateCardDto[];
}
