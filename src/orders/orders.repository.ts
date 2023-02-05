import { Injectable } from "@nestjs/common";
import { DataSource, Like, Repository } from "typeorm";
import { GetOrdersFiltersDto } from "./dto/get-orders-filters-dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersRepository extends Repository<Order> {

    constructor(dataSource: DataSource) {
        super(Order, dataSource.createEntityManager());
    }

    async findOrdersByFilters(filters: GetOrdersFiltersDto) {
        const query = this.createQueryBuilder();

        if (filters.search)
            query.andWhere({ title: Like(`%${filters.search}%`) })

        query.skip((filters.page - 1) * filters.limit);
        query.take(filters.limit);

        return await query.getMany()
    }
}