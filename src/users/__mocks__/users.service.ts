import { fakeOrder } from "../../orders/test/fake-data/fake-orders";
import { fakeUser } from "../test/fack-data/users.fack-data";

export const UsersService = jest.fn().mockReturnValue({
    findAll: jest.fn().mockResolvedValue([fakeUser()]),
    findOneByEmail: jest.fn().mockResolvedValue(fakeUser()),
    findOne: jest.fn().mockResolvedValue(fakeUser()),
    create: jest.fn().mockResolvedValue(fakeUser()),
    update: jest.fn().mockResolvedValue(fakeUser()),
    delete: jest.fn().mockResolvedValue(fakeUser()),
    findOrdersByUserId: jest.fn().mockResolvedValue([fakeOrder()]),
});