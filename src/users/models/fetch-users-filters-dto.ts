import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsEnum } from 'class-validator';
import { UserType } from './../entities/user.entity';

export class FetchUsersFiltersDto {
    
    @ApiProperty({ required: false, default: 1 })
    @IsNumber()
    @Type(() => Number)
    page: number = 1;

    @ApiProperty({ required: false, default: 10 })
    @Type(() => Number)
    @IsNumber()
    limit: number = 10;
    
    @ApiProperty({ required: false, enum: UserType, default: UserType.BENEFICIARY })
    @IsEnum(UserType)
    user_type: UserType = UserType.BENEFICIARY;

}
