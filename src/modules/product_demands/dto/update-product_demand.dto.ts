import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDemandDto } from './create-product_demand.dto';

export class UpdateProductDemandDto extends PartialType(CreateProductDemandDto) {}
