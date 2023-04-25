import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './models/create-product-dto';
import { UpdateProductDto } from './models/update-product-dto';

@Injectable()
export class ProductsService {

    constructor(
        private readonly productsRepository: ProductsRepository,
    ) { }

    async findAll() {
        return await this.productsRepository.find();
    }

    async findOne(id: number) {
        const product = await this.productsRepository.findOne({ where: { id }, relations: ['owner'] });
        if (!product) {
            throw new NotFoundException(`Product with id: ${id}, not found`);
        }

        return product;
    }

    async create(product: CreateProductDto) {
        return await this.productsRepository.save(product);
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);
        this.productsRepository.merge(product, updateProductDto);
        return await this.productsRepository.save(product);
    }

    async remove(id: number) {
        const product = await this.findOne(id);
        return await this.productsRepository.softRemove(product);
    }
}
