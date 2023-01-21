import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './../entities/user.entity';

export class FetchUsersFiltersDto {
    @ApiProperty({ required: false, default: 1 })
    page?: number;

    @ApiProperty({ required: false, default: 10 })
    limit?: number;

    @ApiProperty({ required: false, enum: UserType, default: UserType.BENEFICIARY })
    userType?: UserType

}
