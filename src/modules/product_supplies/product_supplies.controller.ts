import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSuppliesService } from './product_supplies.service';
import { CreateProductSupplyDto } from './dto/create-product_supply.dto';
import { UpdateProductSupplyDto } from './dto/update-product_supply.dto';

@Controller('product-supplies')
export class ProductSuppliesController {
  constructor(private readonly productSuppliesService: ProductSuppliesService) {}

  @Post()
  create(@Body() createProductSupplyDto: CreateProductSupplyDto) {
    return this.productSuppliesService.create(createProductSupplyDto);
  }

  @Get()
  findAll() {
    return this.productSuppliesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSuppliesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSupplyDto: UpdateProductSupplyDto) {
    return this.productSuppliesService.update(+id, updateProductSupplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSuppliesService.remove(+id);
  }
}
