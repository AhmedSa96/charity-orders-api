import { fackUser } from "../test/fack-data/users.fack-data";

export const UsersService = jest.fn().mockReturnValue({
    findAll: jest.fn().mockResolvedValue([fackUser()]),
    findOneByEmail: jest.fn().mockResolvedValue(fackUser()),
    findOne: jest.fn().mockResolvedValue(fackUser()),
    create: jest.fn().mockResolvedValue(fackUser()),
    update: jest.fn().mockResolvedValue(fackUser()),
    delete: jest.fn().mockResolvedValue(fackUser()),
});