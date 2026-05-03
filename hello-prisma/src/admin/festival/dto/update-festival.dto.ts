import { CreateCardDto } from '../../card/dto/create-card.dto';
import { CreateWisherDto } from '../../wisher/dto/create-wisher.dto';
export class UpdateFestivalDto {
  festivalName?: string;
  image?: string;
  wisher?: CreateWisherDto[];
  card?: CreateCardDto[];
}
