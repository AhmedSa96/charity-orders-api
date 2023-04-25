import { fakeProduct } from "../test/fake-data/fake-products";


export const ProductsRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(fakeProduct()),
    merge: jest.fn().mockReturnValue(fakeProduct()),
    save: jest.fn().mockResolvedValue(fakeProduct()),
    findOne: jest.fn().mockResolvedValue(fakeProduct()),
    find: jest.fn().mockResolvedValue([fakeProduct()]),
    softRemove: jest.fn().mockResolvedValue(fakeProduct()),
})