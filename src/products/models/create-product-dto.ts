import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    owner_id: number;
}