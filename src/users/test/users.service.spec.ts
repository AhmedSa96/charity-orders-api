import { User } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { fakeCreateUserDto, fakeUpdateUserDto, fakeUser } from '../test/fack-data/users.fack-data';
import { UsersService } from '../users.service';
import { UsersRepository } from '../users.repository';

jest.mock('../users.repository');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll({ page: 1, limit: 10, user_type: null });
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual([fakeUser()]);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(fakeUser());
    });
  });

  describe('create', () => {
    it('should return a user', async () => {
      const result = await service.create(fakeCreateUserDto());
      expect(result).toEqual(fakeUser());
    });
  });

  describe('update', () => {
    it('should return a user', async () => {
      const result = await service.update(fakeUpdateUserDto());
      expect(result).toEqual(fakeUser());
    });
  });

  describe('remove', () => {
    it('should return a user', async () => {
      const result = await service.delete(1);
      expect(result).toEqual(fakeUser());
    });
  });
});
