// import { PaginationOptions, PaginatedResult } from "./pagination.interface";
import { PaginationOptions, PaginatedResult } from './paginate.interface';
export function calculatePagination(options: PaginationOptions) {
  const { page, limit } = options;
  const skip = (page - 1) * limit;
  const take = limit;

  return { skip, take };
}

export function createPaginatedResult<T>(
  data: T[],
  total: number,
  options: PaginationOptions,
): PaginatedResult<T> {
  const { page, limit } = options;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function paginate<T>(
  queryFn: (skip: number, take: number) => Promise<T[]>,
  countFn: () => Promise<number>,
  options: PaginationOptions,
): Promise<PaginatedResult<T>> {
  const { skip, take } = calculatePagination(options);

  const [data, total] = await Promise.all([queryFn(skip, take), countFn()]);

  return createPaginatedResult(data, total, options);
}
