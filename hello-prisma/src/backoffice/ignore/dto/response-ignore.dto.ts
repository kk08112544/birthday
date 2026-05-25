export class ResponseIgnoreDto {
  igId!: number;
  word!: string;
  createdBy!: number;
  updatedBy!: number | null;
  deletedBy!: number | null;
  createdByUser!: {
    uId: number;
    firstName: string;
    userName: string;
  };
  updatedByUser!: {
    uId: number;
    firstName: string;
    userName: string;
  } | null;
  deletedByUser!: {
    uId: number;
    firstName: string;
    userName: string;
  } | null;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
}
