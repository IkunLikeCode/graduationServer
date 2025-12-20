import { Module } from '@nestjs/common';
import { ProductSuppliesService } from './product_supplies.service';
import { ProductSuppliesController } from './product_supplies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSupply } from './entities/product_supply.entity';
@Module({
  controllers: [ProductSuppliesController],
  providers: [ProductSuppliesService],
  imports: [TypeOrmModule.forFeature([ProductSupply])],
})
export class ProductSuppliesModule {}
