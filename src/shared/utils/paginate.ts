import { SelectQueryBuilder } from "typeorm";

export function paginate<T>(query: SelectQueryBuilder<T>, page?: number, limit?: number) {
    const currentPage = page || 1;
    const perPage = limit || 10;
    const offset = (currentPage - 1) * perPage;
    return query.offset(offset).limit(perPage);
};