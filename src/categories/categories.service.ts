import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repository/products.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly category:CategoryRepository){}

  create(createCategoryDto: CreateCategoryDto) {
    return this.category.create(createCategoryDto)
  }

  async findAll() {
    return await `This action returns all categories`;
  }

  async findOne(id: number) {
    return await `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} category`;
  }
}
