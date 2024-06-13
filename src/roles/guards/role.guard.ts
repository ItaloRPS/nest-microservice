import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/user/user-toles';

@Injectable()
export class RoleGuard implements CanActivate {

  // reflector extract the decorators from the method
  constructor(private readonly reflector: Reflector){}
  canActivate(context: ExecutionContext): boolean  {
      const requireRoles = this.reflector.getAllAndOverride<UserRoles[]>(
        'roles',
        [context.getHandler(),context.getClass()]
        // #context.getHandler() return the http method
        // #context.getClass() return the classe
        // #EX:GET /users/:id, context.getHandler() will return the findOne function, and context.getClass() will return UserController.
      )
    if(!requireRoles){
      return true;
    }
     const {user} = context.switchToHttp().getRequest()
     return requireRoles.some((role)=>user.profileId.includes(role)) 
  }
}
