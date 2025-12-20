import { Test, TestingModule } from '@nestjs/testing';
import { ProductSuppliesController } from './product_supplies.controller';
import { ProductSuppliesService } from './product_supplies.service';

describe('ProductSuppliesController', () => {
  let controller: ProductSuppliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSuppliesController],
      providers: [ProductSuppliesService],
    }).compile();

    controller = module.get<ProductSuppliesController>(ProductSuppliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
