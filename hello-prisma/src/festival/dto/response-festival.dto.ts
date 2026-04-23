//ResponseFestivalDto.ts
export class ResponseFestivalDto {
  fId!: number;
  festivalName!: string;
  image!: string;

  // ใน Schema คือ Wisher[] ดังนั้นต้องเป็น Array ของ Object
  wisher!: {
    wId: number;
    wishWord: string;
    festivalId: number;
  }[];

  // ใน Schema คือ Card[] ดังนั้นต้องเป็น Array ของ Object
  card!: {
    cId: number;
    imageCard: string;
    festivalId: number;
  }[];
}
