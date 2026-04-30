// import { ResponseFestivalDto } from "src/festival/dto/response-festival.dto";

export class ResponseCardDto {
  cId!: number;
  imageCard!: string;
  festivalId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
  // festival?:ResponseFestivalDto;
}
