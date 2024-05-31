import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';


@Injectable()
export class CategoryRepository {

  constructor(private readonly prisma: PrismaService) {}

   create(category: CreateCategoryDto) {
     return this.prisma.category.create({
        data:category
    });
  }

 async findAll():Promise<CategoryEntity[]> {
     return await this.prisma.product.findMany({
        orderBy:{
            createdAt:'desc'
        }
     });
  }

  async findOne(id: number):Promise<CategoryEntity>{
    return await this.prisma.product.findUnique({
      where:{
        id
      }
   });
  }

 async update(id: number, updateProductDto: UpdateCategoryDto):Promise<CategoryEntity> {
       const product = await this.prisma.product.findUnique({
      where:{
        id
      }
    })
    if(!product){
      throw new NotFoundError('category not found');
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
