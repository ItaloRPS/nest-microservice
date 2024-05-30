import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';


@Injectable()
export class CategoriesRepository {

  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
        data:createCategoryDto
    });
  }

 async findAll() {
     return await this.prismaService.category.findMany({
        orderBy:{
            createdAt:'desc'
        }
     });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
