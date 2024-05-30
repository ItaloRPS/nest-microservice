import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './repository/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository:CategoriesRepository){}
   create(createCategoryDto: CreateCategoryDto) {
   try {
    return this.categoriesRepository.create(createCategoryDto)
   } catch (error) {
    throw new Error(error)
   }
  }

  async findAll() {
    try {
      return await this.categoriesRepository.findAll()
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id: number) {
    try {
      return await this.categoriesRepository.findOne(id)
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoriesRepository.update(id, updateCategoryDto)
    } catch (error) {
      throw new Error(error)
    }
  }

  remove(id: number) {
    try {
      return this.categoriesRepository.remove(id)
    } catch (error) {
      throw new Error(error)
    }
  }
}
