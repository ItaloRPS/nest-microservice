import {Product} from '@prisma/client'
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductDto{

    @MaxLength(255)
    @IsString({ message: 'the name must be a string.' })
    @IsNotEmpty({ message: 'the name must not be a null.' })
    name: string;
    
    @IsNumber({},{ message: 'the name must be a string.' })
    @IsNotEmpty({ message: 'the name must not be a null.' })
    price: number;

    categoryId: number;
}
