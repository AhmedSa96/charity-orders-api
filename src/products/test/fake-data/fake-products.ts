import { Product } from "../../entities/product.entity";
import { CreateProductDto } from "../../models/create-product-dto";
import { UpdateProductDto } from "../../models/update-product-dto";
import { UserType } from "../../../users/entities/user.entity";


export const fakeProduct = (): Product => ({
    id: 1,
    name: 'fake title',
    description: 'fake description',
    stock: 1,
    latitude: 1,
    longitude: 1,
    created_at: null,
    updated_at: null,
    deleted_at: null,
    orders: [],
    owner: {
        id: 1,
        first_name: 'fake first name',
        last_name: 'fake last name',
        email: 'fake email',
        phone: 'fake phone',
        password: 'fake password',
        user_type: UserType.ADMIN,
        created_at: null,
        updated_at: null,
        deleted_at: null,
        orders: [],
        products: [],
        favorate_products: [],
    },
});

export const fakeCreateProductDto = (): CreateProductDto => ({
    name: 'fake title',
    description: 'fake description',
    stock: 1,
    latitude: 1,
    longitude: 1,
    owner_id: 1,
});

export const fakeUpdateProductDto = (): UpdateProductDto => ({
    name: 'fake title',
    description: 'fake description',
    stock: 1,
    latitude: 1,
    longitude: 1,
    owner_id: 1,
});