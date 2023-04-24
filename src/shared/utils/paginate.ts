import { ObjectLiteral } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

export interface PaginationResult<T> {
  data: T[];
  nextPage?: string;
  prevPage?: string;
  totalCount: number;
  currentPage: number;
  pageLimit: number;
}

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity extends ObjectLiteral> {
    paginate(options: any): Promise<PaginationResult<Entity>>;
  }
}

SelectQueryBuilder.prototype.paginate = async function <T>(
  this: SelectQueryBuilder<T>,
  options: any,
): Promise<PaginationResult<T>> {
  const page = Number(options.page) || 1;
  const perPage = Number(options.per_page) || 15;
  const totalCount = await this.getCount();
  const totalPages = Math.ceil(totalCount / perPage);
  const nextPage =
    page < totalPages ? `page=${page + 1}&per_page=${perPage}` : null;
  const prevPage = page > 1 ? `page=${page - 1}&per_page=${perPage}` : null;
  const data = await this.skip((page - 1) * perPage)
    .take(perPage)
    .getMany();

  return {
    data,
    totalCount,
    currentPage: page,
    pageLimit: perPage,
    nextPage,
    prevPage,
  };
};
