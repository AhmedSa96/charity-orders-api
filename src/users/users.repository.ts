import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { Injectable } from '@nestjs/common';
import { Repository, DataSource, IsNull } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {

    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findAll(filters: FetchUsersFiltersDto): Promise<User[]> {
        const query = this.createQueryBuilder()
            .where({ deleted_at: IsNull() });

        if (filters.user_type) {
            query.andWhere({ user_type: filters.user_type });
        }

        if (filters.page && filters.limit) {
            query.skip((filters.page - 1) * filters.limit);
            query.take(filters.limit);
        }

        return await query.getMany();
    }
}
