export class ResponseFestivalDto {
  fId!: number;
  festivalName!: string;
  image!: string;
  webName!: string | null;
  logo!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;

  isEdit!: boolean;
  isDelete!: boolean;
  isEditEndDate!: boolean;

  startDate!: Date;
  endDate!: Date;

  createdBy!: number;
  deletedBy!: number | null;

  createdByUser!: {
    uId: number;
    firstName: string;
    userName: string;
    role: string;
  };

  deletedByUser!: {
    uId: number;
    firstName: string;
    userName: string;
    role: string;
  } | null;

  wisher!: {
    wId: number;
    wishWord: string;
    festivalId: number;
  }[];

  card!: {
    cId: number;
    imageCard: string;
    festivalId: number;
  }[];
}
