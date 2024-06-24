import {User} from '@prisma/client'

export class UserEnity implements User {
    hash: string;
    id: number;
    name: string;
    email: string;
    password: string;
    profileId: number;
    companyId: number;

}
