import { User, UserRole } from './../users/entities/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

type Roles = keyof typeof UserRole | 'Any'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector:Reflector){}
  canActivate(context: ExecutionContext) {

    const roles:Roles[] = this.reflector.get('roles', context.getHandler())
    if(!roles){
      return true
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user:User = gqlContext['user'];
    
    if (!user) {
      return false;
    }
    // console.log('user', user.role, 'meta', roles)
    if(roles.includes(user.role) || roles.includes('Any')){
      return true
    }
  }
}
