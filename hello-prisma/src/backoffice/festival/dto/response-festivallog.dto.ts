import { PaginatedResult } from 'src/common/pagination/paginate.interface';
export interface ResponseFestivalLog extends PaginatedResult<string> {
  createCount: number;
  updateCount: number;
  deleteCount: number;
}
