import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesRepository } from './repository/categories.repository';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService ,CategoriesRepository ,PrismaService],
  exports:[CategoriesService]
})
export class CategoriesModule {}
