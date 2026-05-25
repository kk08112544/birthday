import { PaginatedResult } from 'src/common/pagination/paginate.interface';
export interface ResponseIgnoreLog extends PaginatedResult<string> {
  createCount: number;
  updateCount: number;
  deleteCount: number;
}
