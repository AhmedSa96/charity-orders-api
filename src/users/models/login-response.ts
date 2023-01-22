import { ApiProperty } from '@nestjs/swagger';
import { UserResource } from './user-resource';

export class LoginResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: UserResource;
}
