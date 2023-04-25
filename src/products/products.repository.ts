import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { GetProductsFilters } from "./models/get-products-filters";
import "../shared/utils/paginate";

@Injectable()
export class ProductsRepository extends Repository<Product> {

    constructor(dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }

    findByFilters(filters: GetProductsFilters) {
        const { search, owner_id, page, per_page } = filters;
        const query = this.createQueryBuilder('product');

        if (search) {
            query.andWhere('product.name ILIKE :search', { search: `%${search}%` });
        }

        if (owner_id) {
            query.andWhere('product.owner_id = :owner_id', { owner_id });
        }


        return query.paginate(filters);
    }
}