import { Injectable } from "@nestjs/common";
import  "../shared/utils/paginate";
import { DataSource, Like, Repository } from "typeorm";
import { GetOrdersFiltersDto } from "./dto/get-orders-filters-dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersRepository extends Repository<Order> {

    constructor(dataSource: DataSource) {
        super(Order, dataSource.createEntityManager());
    }

    async findOrdersByFilters(filters: Partial<GetOrdersFiltersDto>) {
        let query = this.createQueryBuilder();

        if (filters.search)
            query.andWhere({ title: Like(`%${filters.search}%`) })


        return await query.paginate({ page: filters.page, per_page: filters.limit });
    }
}