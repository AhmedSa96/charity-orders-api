import { Injectable } from '@nestjs/common';
import { Repository, DataSource, IsNull } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {

    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findAll(): Promise<User[]> {
        return await this.createQueryBuilder()
            .where({ deleted_at: IsNull() })
            .getMany();
    }
}
