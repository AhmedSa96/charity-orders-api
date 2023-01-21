import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    user_type: UserType;
}