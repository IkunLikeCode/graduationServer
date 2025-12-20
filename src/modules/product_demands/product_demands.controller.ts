import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductDemandsService } from './product_demands.service';
import { CreateProductDemandDto } from './dto/create-product_demand.dto';
import { UpdateProductDemandDto } from './dto/update-product_demand.dto';

@Controller('product-demands')
export class ProductDemandsController {
  constructor(private readonly productDemandsService: ProductDemandsService) {}

  @Post()
  create(@Body() createProductDemandDto: CreateProductDemandDto) {
    return this.productDemandsService.create(createProductDemandDto);
  }

  @Get()
  findAll() {
    return this.productDemandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDemandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDemandDto: UpdateProductDemandDto) {
    return this.productDemandsService.update(+id, updateProductDemandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDemandsService.remove(+id);
  }
}
