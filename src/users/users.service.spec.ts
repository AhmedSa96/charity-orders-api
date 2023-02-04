import { User } from './entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { fackUser } from './test/fack-data/users.fack-data';
import { UsersService } from './users.service';



describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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

  it('should return an array of users', async () => {
    const result = await service.findAll({ page: 1, limit: 10, user_type: null });
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual([fackUser()]);
  });
});
