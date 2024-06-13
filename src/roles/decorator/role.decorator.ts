import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/user/user-toles';

export const Role = (...args: UserRoles[]) => SetMetadata('roles', args);
