import { UserResource } from './models/user-resource';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { Injectable } from '@nestjs/common';
import { Repository, DataSource, IsNull } from 'typeorm';
import { User } from './entities/user.entity';
import { getSelectColumns } from 'src/shared/utils/get-select-columns';
import {  } from 'src/shared/utils/paginate';

@Injectable()
export class UsersRepository extends Repository<User> {

    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findAll(filters: FetchUsersFiltersDto) {
        let query = this.createQueryBuilder()
            .select(getSelectColumns(UserResource, User))

        if (filters.user_type) {
            query.andWhere({ user_type: filters.user_type });
        }

        // query = paginate(query, filters.page, filters.limit);

        return await query.paginate({ page: filters.page, per_page: filters.limit });
    }
}
