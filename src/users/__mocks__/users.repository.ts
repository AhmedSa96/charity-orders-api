import { fakeUser } from "../test/fack-data/users.fack-data";

export const UsersRepository = jest.fn().mockReturnValue({
    findAll: jest.fn().mockResolvedValue([fakeUser()]),
    findOne: jest.fn().mockResolvedValue(fakeUser()),
    create: jest.fn().mockResolvedValue(fakeUser()),
    save: jest.fn().mockResolvedValue(fakeUser()),
    update: jest.fn().mockResolvedValue(fakeUser()),
    delete: jest.fn().mockResolvedValue(fakeUser()),
});