// import { User } from './../users/entities/user.entity';
// import { map, Observable } from 'rxjs';
// import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        // private usersService: UsersService,
        private jwtService: JwtService
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
}
