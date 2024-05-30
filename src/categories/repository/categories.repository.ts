import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';


@Injectable()
export class CategoriesRepository {

  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto):Promise<CategoryEntity> {
    return this.prisma.category.create({
        data:createCategoryDto
    });
  }

 async findAll():Promise<CategoryEntity[]> {
     return await this.prisma.category.findMany({
        orderBy:{
            createdAt:'desc'
        }
     });
  }

  async findOne(id: number):Promise<CategoryEntity>{
    return await this.prisma.category.findUnique({
      where:{
        id
      }
   });
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<CategoryEntity> {
       const category = await this.prisma.category.findUnique({
      where:{
        id
      }
    })
    if(!category){
      throw new NotFoundError('category not found');
    }

    return await this.prisma.category.update({
      where: {
          id,
      },
      data:updateCategoryDto,
    })
  }

  async remove(id: number) {
    return await this.prisma.category.delete({
      where: {
          id,
      },
    })
  }
}
