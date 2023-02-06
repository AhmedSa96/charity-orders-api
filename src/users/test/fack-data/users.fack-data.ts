import { UpdateUserDto } from './../../models/update-user-dto';
import { UserResource } from './../../models/user-resource';
import { User, UserType } from './../../entities/user.entity';
import { CreateUserDto } from 'src/users/models/create-user-dto';
import { CurrentAuthUser } from 'src/auth/models/current-auth-user';

export const fakeCurrentUserAuth = (): CurrentAuthUser => ({
  id: 1,
  email: 'ahmed@salah.dev',
  sub: 1,
  user_type: UserType.ADMIN,
});

export const fakeUser = (): UserResource => ({
  id: 1,
  email: 'test@test.com',
  first_name: 'test',
  last_name: 'test',
  user_type: UserType.BENEFICIARY,
  created_at: null,
  updated_at: null,
});

export const fakeCreateUserDto = (): CreateUserDto => ({
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'test',
    password: 'test',
    phone: 'test',
    user_type: UserType.BENEFICIARY,
});

export const fakeUpdateUserDto = (): UpdateUserDto => ({
    id: 1,
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'test',
    phone: 'test',
    user_type: UserType.BENEFICIARY,
});
