import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @IsPublic()
  @Get("actives")
  findActives(@Query()query) {
    const skip = query.skip&&(+query.skip)
    const limit = query.limit&&(+query.limit)
    const categoryId = query.categoryId&&(+query.categoryId)
    return this.productsService.findActives(skip, limit, categoryId);
  }

  @IsPublic()
  @Get("recommended")
  findRecommended() {
    return this.productsService.findRecommended();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
