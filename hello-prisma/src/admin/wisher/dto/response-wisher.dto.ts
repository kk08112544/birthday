// import { ResponseFestivalDto } from "src/festival/dto/response-festival.dto";

export class ResponseWisherDto {
  wId!: number;
  wishWord!: string;
  festivalId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
  // festival?:ResponseFestivalDto;
}
