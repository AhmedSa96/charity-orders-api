import { UserResource } from './models/user-resource';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { Injectable } from '@nestjs/common';
import { Repository, DataSource, IsNull } from 'typeorm';
import { User } from './entities/user.entity';
import { getProperties } from 'src/shared/utils/get-proparities';

@Injectable()
export class UsersRepository extends Repository<User> {

    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findAll(filters: FetchUsersFiltersDto): Promise<UserResource[]> {

        const query = this.createQueryBuilder()
            .select(getProperties(UserResource, User))

        if (filters.user_type) {
            query.andWhere({ user_type: filters.user_type });
        }

        if (filters.page && filters.limit) {
            query.skip((filters.page - 1) * filters.limit);
            query.take(filters.limit);
        }

        return await query.getRawMany();
    }
}
