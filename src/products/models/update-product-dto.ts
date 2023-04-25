import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
    @ApiProperty()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsNumber()
    stock?: number;

    @ApiProperty()
    @IsNumber()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    longitude: number;

    @ApiProperty()
    @IsNumber()
    owner_id?: number;
}