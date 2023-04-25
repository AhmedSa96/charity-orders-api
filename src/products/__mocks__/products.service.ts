import { fakeProduct } from "../test/fake-data/fake-products";

export const ProductsService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(fakeProduct()),
    findAll: jest.fn().mockResolvedValue([fakeProduct()]),
    findOne: jest.fn().mockResolvedValue(fakeProduct()),
    update: jest.fn().mockResolvedValue(fakeProduct()),
    remove: jest.fn().mockResolvedValue(fakeProduct()),
});