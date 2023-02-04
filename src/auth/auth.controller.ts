import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './models/login-dto';
import { LoginResponse } from './models/login-response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  @ApiNotFoundResponse({
    description: 'Not found',
    schema: { example: { statusCode: 404, message: 'invalid creditioals' } },
  })
  async login(@Body() user: LoginDto): Promise<LoginResponse> {
    return await this.authService.loginUser(user);
  }
}
