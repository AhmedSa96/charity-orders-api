import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProductsFilters {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  owner_id?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  per_page?: number;
}
