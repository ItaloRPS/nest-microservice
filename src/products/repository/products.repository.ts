import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';


@Injectable()
export class ProductsRepository {

  constructor(private readonly prisma: PrismaService) {}

   create(createProductDto: CreateProductDto):Promise<ProductEntity> {
    return this.prisma.product.create({
        data:createProductDto
    });
  }

 async findAll():Promise<ProductEntity[]> {
     return await this.prisma.product.findMany({
        orderBy:{
            createdAt:'desc'
        }
     });
  }

  async findOne(id: number):Promise<ProductEntity>{
    return await this.prisma.product.findUnique({
      where:{
        id
      }
   });
  }

 async update(id: number, updateProductDto: UpdateProductDto):Promise<ProductEntity> {
       const product = await this.prisma.product.findUnique({
      where:{
        id
      }
    })
    if(!product){
      throw new NotFoundError('product not found');
    }

    return await this.prisma.product.update({
      where: {
          id,
      },
      data:updateProductDto,
    })
  }

  async remove(id: number) {
    return await this.prisma.product.delete({
      where: {
          id,
      },
    })
  }
}
