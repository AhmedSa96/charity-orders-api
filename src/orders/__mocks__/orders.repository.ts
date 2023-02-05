import { fakeOrder } from "../test/fake-data/fake-orders";

export const OrdersRepository = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(fakeOrder()),
    merge: jest.fn().mockReturnValue(fakeOrder()),
    save: jest.fn().mockResolvedValue(fakeOrder()),
    findOne: jest.fn().mockResolvedValue(fakeOrder()),
    findOrdersByFilters: jest.fn().mockResolvedValue([fakeOrder()]),
    softRemove: jest.fn().mockResolvedValue(fakeOrder()),
})