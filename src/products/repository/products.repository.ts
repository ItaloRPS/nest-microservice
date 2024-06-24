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
    })
  }

 async findAll():Promise<ProductEntity[]> {
     return await this.prisma.product.findMany({
        orderBy:{
            createdAt:'desc'
        }
     });
  }
  
 async findActives(skip = 0, limit =10, categoryId?:number):Promise<ProductEntity[]> {
    let whereCondition:{status: string, categoryId?: number} = {
        status: 'A'
      };

      if (categoryId !== undefined) {
          whereCondition.categoryId = categoryId;
      }

     return await this.prisma.product.findMany({
        skip,
        take:limit,
        where:whereCondition,
        orderBy:{
            createdAt:'desc'
        }
     });
  }

 async findRecommended():Promise<ProductEntity[]> {
     return await this.prisma.$queryRaw`
          SELECT *
          FROM (
              SELECT *,
              ROW_NUMBER() OVER (PARTITION BY categoryId ORDER BY updatedAt DESC) AS row_num
              FROM product
              WHERE STATUS = 'A'
          ) AS numbered_products
          WHERE row_num <=2
          ORDER by createdAt
          LIMIT 10;
     `;
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
