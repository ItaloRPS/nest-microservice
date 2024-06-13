import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService){}
  async canActivate(context: ExecutionContext):Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = await this.validate(request)
    if(!user){
      throw new UnauthorizedException();
    }
    request.user = user
    return true;
  }

  async validate(request){
      const {query:{access_token}} = request
      const user = await this.authService.validateGoogleToken(access_token)
      return user
  }
}
