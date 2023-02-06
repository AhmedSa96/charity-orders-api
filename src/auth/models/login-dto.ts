import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

    @ApiProperty({ example: 'ahmed@salah.dev' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email is invalid' })
    email: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}