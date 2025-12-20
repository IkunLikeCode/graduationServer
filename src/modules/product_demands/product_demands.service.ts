import { Injectable } from '@nestjs/common';
import { CreateProductDemandDto } from './dto/create-product_demand.dto';
import { UpdateProductDemandDto } from './dto/update-product_demand.dto';

@Injectable()
export class ProductDemandsService {
  create(createProductDemandDto: CreateProductDemandDto) {
    return 'This action adds a new productDemand';
  }

  findAll() {
    return `This action returns all productDemands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productDemand`;
  }

  update(id: number, updateProductDemandDto: UpdateProductDemandDto) {
    return `This action updates a #${id} productDemand`;
  }

  remove(id: number) {
    return `This action removes a #${id} productDemand`;
  }
}
