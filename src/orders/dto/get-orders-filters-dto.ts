import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class GetOrdersFiltersDto {

    @ApiProperty({ default: 1, required: false })
    @IsNumber()
    @Type(() => Number)
    page?: number;

    @ApiProperty({ default: 10, required: false })
    @IsNumber()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({ required: false })
    search?: string;
}