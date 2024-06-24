import {Product} from '@prisma/client'

export class ProductEntity implements Product{
    image: string;
    rating: number;
    status: string;
    id: number;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    categoryId: number;
}
