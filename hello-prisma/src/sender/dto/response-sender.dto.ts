export class ResponseSenderDto {
  sId!: number;
  fullname!: string;
  position!: string;
  department!: string;
  cardId!: number;
  wishId!: number;

  card!: {
    cId: number;
    imageCard: string;
  };
  wish!: {
    wId: number;
    wishWord: string;
  };
  createdAt!: Date;
  festivalId!: number;
  festival!: {
    fId: number;
    festivalName: string;
  };
}
