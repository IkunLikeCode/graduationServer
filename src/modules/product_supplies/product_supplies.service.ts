import { Injectable } from '@nestjs/common';
import { CreateProductSupplyDto } from './dto/create-product_supply.dto';
import { UpdateProductSupplyDto } from './dto/update-product_supply.dto';

@Injectable()
export class ProductSuppliesService {
  create(createProductSupplyDto: CreateProductSupplyDto) {
    return 'This action adds a new productSupply';
  }

  findAll() {
    return `This action returns all productSupplies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSupply`;
  }

  update(id: number, updateProductSupplyDto: UpdateProductSupplyDto) {
    return `This action updates a #${id} productSupply`;
  }

  remove(id: number) {
    return `This action removes a #${id} productSupply`;
  }
}
