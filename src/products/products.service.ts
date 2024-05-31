import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './repository/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repository:ProductsRepository){}

  create(createProductDto: CreateProductDto) {
    return this.repository.create(createProductDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOne(id: number) {
      return await this.repository.findOne(id)
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.repository.update(id, updateProductDto)
  }

  remove(id: number) {
    return this.repository.remove(id)
  }
}
