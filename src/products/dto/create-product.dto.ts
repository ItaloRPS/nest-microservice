import {Product} from '@prisma/client'
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
    @MaxLength(255)
    @IsString({ message: 'The name must be a string.' })
    @IsNotEmpty({ message: 'The name must not be empty.' })
    name: string;

    @MaxLength(255)
    @IsString({ message: 'The image must be a string.' })
    @IsNotEmpty({ message: 'The image must not be empty.' })
    image: string;
    
    @IsNumber({}, { message: 'The price must be a number.' })
    @IsNotEmpty({ message: 'The price must not be empty.' })
    price: number;

    @MaxLength(255)
    @IsString({ message: 'The status must be a string.' })
    @IsNotEmpty({ message: 'The status must not be empty.' })
    status: string;

    @IsNumber({}, { message: 'The categoryId must be a number.' })
    @IsNotEmpty({ message: 'The categoryId must not be empty.' })
    categoryId: number;

    rating: number;
}