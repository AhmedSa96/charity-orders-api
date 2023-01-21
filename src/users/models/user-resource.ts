import { User } from './../entities/user.entity';
import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "../entities/user.entity";

export class UserResource {
    @ApiProperty()
    id: number = 0;

    @ApiProperty()
    first_name: string = '';

    @ApiProperty()
    last_name: string = '';

    @ApiProperty()
    email: string = '';

    @ApiProperty()
    user_type: UserType = UserType.BENEFICIARY;

    @ApiProperty()
    created_at: Date = new Date();

    @ApiProperty()
    updated_at: Date = new Date();

}