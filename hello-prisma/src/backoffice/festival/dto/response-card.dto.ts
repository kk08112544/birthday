export class ResponseCardDto {
  cId!: number;
  imageCard!: string;
  festivalId!: number;
  festival!: {
    fId: number;
    festivalName: string;
    createdAt: Date;
  };
}
