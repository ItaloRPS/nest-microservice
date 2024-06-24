import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback, Profile} from "passport-google-oauth20";
import { UserService } from "src/user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ 
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_SECRET_KEY,
        callbackURL:`${process.env.GOOGLE_CALLBACK_URL}/auth/google/callback`,
        scope:['email','profile']
     });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile , done:VerifyCallback): Promise<any> {
     try {
       const {displayName,_json:{email}} = profile
       const data = {
         name:displayName as string,
         email:email as string,
         password:'',
         profileId:1,
         companyId:1
        }
        this.userService.findOrCreateUser(data)
       done(null, profile)
     } catch (error) {
       done(error)
     }
  }
}