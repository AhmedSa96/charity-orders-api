import { Exclude } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { UserType } from "../entities/user.entity";

export class UserResource {
    @ApiProperty({ example: 1 })
    id: number = 0;

    @ApiProperty({ example: 'John' })
    first_name: string = '';

    @ApiProperty({ example: 'Doe' })
    last_name: string = '';

    @ApiProperty({ example: 'user@gmail.com'})
    email: string = '';

    @ApiProperty({ enum: UserType, default: UserType.BENEFICIARY })
    @IsEnum(UserType, { message: 'user type is not valid' })
    user_type: UserType = UserType.BENEFICIARY;

    @ApiProperty()
    created_at: Date = new Date();

    @ApiProperty()
    updated_at: Date = new Date();

    @Exclude()
    password?: string;

    @Exclude()
    deleted_at?: Date;
}