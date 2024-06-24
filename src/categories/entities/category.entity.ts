import {Category} from '@prisma/client'
export class CategoryEntity implements Category {
    status: string;
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
