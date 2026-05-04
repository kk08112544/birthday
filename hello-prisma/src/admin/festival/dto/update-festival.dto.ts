import { UpdateCardDto } from "./update-card.dto";
import { UpdateWisherDto } from "./update-wisher.dto";
export class UpdateFestivalDto {
  festivalName?: string;
  image?: string;
  wisher?: UpdateWisherDto[];
  card?: UpdateCardDto[];
}
