import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsRepository } from './repository/products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository,PrismaService],
  exports:[ProductsService]
})
export class ProductsModule {}
