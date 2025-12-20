import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product_categories.service';
import { ProductCategoriesController } from './product_categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product_category.entity';
@Module({
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService],
  imports: [TypeOrmModule.forFeature([ProductCategory])],
})
export class ProductCategoriesModule {}
