import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { UserPayload } from './types/userPayload';
import { use } from 'passport';
import { UserToken } from './types/userToken';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findGegister(email);
    const isEqual = await bcrypt.compare(password, user.password);
    if (user && isEqual) {
      const { password, ...result } = user;
      return {...user,password:undefined};
    }
    return null;
  }

  async login(user: User):Promise<UserToken>{
    const payload:UserPayload = { 
      sub:user.id,
      email: user.email,
      name:use.name,
      profile:user.profileId
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateGoogleToken(accessToken: string): Promise<any> {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;

    try {
      const response = await axios.get(url);
      const {data:{name,email}} = response
     if(response && response.data){
      const googleData = {
        name:name as string,
        email:email as string,
        password:'',
        profileId:1
       }
       return this.usersService.findOrCreateUser(googleData)
     }
     new UnauthorizedException('Invalid Google token');
    } catch (error) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}