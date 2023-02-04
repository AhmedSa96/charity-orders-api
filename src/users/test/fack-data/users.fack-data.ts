import { UpdateUserDto } from './../../models/update-user-dto';
import { UserResource } from './../../models/user-resource';
import { User, UserType } from './../../entities/user.entity';
import { CreateUserDto } from 'src/users/models/create-user-dto';

// const date


export const fackUser = (): UserResource => ({
  id: 1,
  email: 'test@test.com',
  first_name: 'test',
  last_name: 'test',
  user_type: UserType.BENEFICIARY,
  created_at: null,
  updated_at: null,
});

export const fackCreateUserDto = (): CreateUserDto => ({
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'test',
    password: 'test',
    phone: 'test',
    user_type: UserType.BENEFICIARY,
});

export const fackUpdateUserDto = (): UpdateUserDto => ({
    id: 1,
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'test',
    phone: 'test',
    user_type: UserType.BENEFICIARY,
});
