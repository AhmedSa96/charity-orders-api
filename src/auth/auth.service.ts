import { LoginDto } from './models/login-dto';
// import { User } from './../users/entities/user.entity';
// import { map, Observable } from 'rxjs';
// import { UsersService } from './../users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './models/login-response';
import { UsersService } from 'src/users/users.service';
import { UserResource } from 'src/users/models/user-resource';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
    constructor(
        // private usersService: UsersService,
        private jwtService: JwtService,
        private usersService: UsersService,
      ) {}
    
    //   validateUser(email: string, pass: string): Observable<any> {
    //     return this.usersService.findOneByEmail(email)
    //         .pipe(
    //             map((user) => {
    //                 if (user && user.password === pass) {
    //                     const { password, ...result } = user;
    //                     return result;
    //                 }
    //                 return null;
    //             })
         
    //         );
    //   }
    
      async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

      async loginUser(user: LoginDto): Promise<LoginResponse> {
        const userEntity = await this.usersService.findOneByEmail(user.email);
        const token = await this.makeUserLogin(userEntity, user);
    
        return {
          access_token: token.access_token,
          user: plainToClass(UserResource, userEntity),
        } as LoginResponse;
      }

      private async makeUserLogin(
        user: User,
        login: LoginDto,
      ): Promise<{ access_token: string }> {
        const isPasswordMatch = await bcrypt.compare(login.password, user.password);
        if (!isPasswordMatch) {
          throw new NotFoundException();
        }
    
        return await this.login(user);
      }
}
