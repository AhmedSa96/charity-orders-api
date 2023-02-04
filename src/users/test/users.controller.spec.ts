import { fackUser, fackCreateUserDto, fackUpdateUserDto } from './fack-data/users.fack-data';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

jest.mock('../users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call usersService.findAll', () => {
      const result = controller.findAll({ page: 1, limit: 10, user_type: null });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10, user_type: null });
    });
    it('should return an array of users', async () => {
      const result = await controller.findAll({ page: 1, limit: 10, user_type: null });
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual([fackUser()]);
    });
  });
  
  describe('findOne', () => {
    it('should call usersService.findOne', () => {
      const result = controller.findOne(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
    it('should return an user', async () => {
      const result = await controller.findOne(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual(fackUser());
    });
  });

  describe('create', () => {
    it('should call usersService.create', () => {
      const result = controller.create(fackCreateUserDto());
      expect(service.create).toHaveBeenCalledWith(fackCreateUserDto());
    });
    it('should return an user', async () => {
      const result = await controller.create(fackCreateUserDto());
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual(fackUser());
    });
  });

  describe('update', () => {
    it('should call usersService.update', () => {
      const result = controller.update(fackUpdateUserDto());
      expect(service.update).toHaveBeenCalledWith(fackUpdateUserDto());
    });
    it('should return an user', async () => {
      const result = await controller.update(fackUpdateUserDto());
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual(fackUser());
    });
  });

  describe('delete', () => {
    it('should call usersService.delete', () => {
      const result = controller.delete(1);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
    it('should return an user', async () => {
      const result = await controller.delete(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual(fackUser());
    });
  });


});
