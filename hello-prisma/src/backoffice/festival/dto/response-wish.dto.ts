export class ResponseWishDto {
  wId!: number;
  wishWord!: string;
  festivalId!: number;
  festival!: {
    fId: number;
    festivalName: string;
    createdAt: Date;
  };
}
