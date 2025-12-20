import { Module } from '@nestjs/common';
import { ProductDemandsService } from './product_demands.service';
import { ProductDemandsController } from './product_demands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDemand } from './entities/product_demand.entity';
@Module({
  controllers: [ProductDemandsController],
  providers: [ProductDemandsService],
  imports: [TypeOrmModule.forFeature([ProductDemand])],
})
export class ProductDemandsModule {}
