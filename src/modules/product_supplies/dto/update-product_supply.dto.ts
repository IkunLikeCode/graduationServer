import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSupplyDto } from './create-product_supply.dto';

export class UpdateProductSupplyDto extends PartialType(CreateProductSupplyDto) {}
