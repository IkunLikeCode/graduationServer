import { Test, TestingModule } from '@nestjs/testing';
import { ProductDemandsService } from './product_demands.service';

describe('ProductDemandsService', () => {
  let service: ProductDemandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductDemandsService],
    }).compile();

    service = module.get<ProductDemandsService>(ProductDemandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
