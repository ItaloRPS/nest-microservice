import {Product} from '@prisma/client'

export class ProductEntity implements Product{
    id: number;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    categoryId: number;
}
