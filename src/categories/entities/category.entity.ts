import {Category} from '@prisma/client'
export class CategoryEntity implements Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
