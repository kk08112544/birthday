import { UpdateCardDto } from './update-card.dto';
import { UpdateWisherDto } from './update-wisher.dto';
export class UpdateFestivalDto {
  festivalName?: string;
  image?: string;
  logo?: string;
  webName?: string;
  startDate?: Date;
  endDate?: Date;

  isEditEndDate?: boolean;
  wisher?: UpdateWisherDto[];
  card?: UpdateCardDto[];
}
