import { ApiProperty } from "@nestjs/swagger";

export class GetOrdersFiltersDto {

    @ApiProperty()
    page: number = 1;

    @ApiProperty()
    limit: number = 10;

    @ApiProperty()
    search?: string;
}