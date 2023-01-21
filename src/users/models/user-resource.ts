import { User } from './../entities/user.entity';
import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "../entities/user.entity";

export class UserResource {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    userType: UserType;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}