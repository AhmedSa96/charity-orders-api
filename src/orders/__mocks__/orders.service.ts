import { fakeOrder } from "../test/fake-data/fake-orders";

export const OrdersService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(fakeOrder()),
    findAll: jest.fn().mockResolvedValue([fakeOrder()]),
    findOne: jest.fn().mockResolvedValue(fakeOrder()),
    update: jest.fn().mockResolvedValue(fakeOrder()),
    remove: jest.fn().mockResolvedValue(fakeOrder()),
});