import { Test, TestingModule } from '@nestjs/testing';
import { ProductDemandsController } from './product_demands.controller';
import { ProductDemandsService } from './product_demands.service';

describe('ProductDemandsController', () => {
  let controller: ProductDemandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductDemandsController],
      providers: [ProductDemandsService],
    }).compile();

    controller = module.get<ProductDemandsController>(ProductDemandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
