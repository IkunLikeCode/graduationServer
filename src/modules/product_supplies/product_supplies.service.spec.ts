import { Test, TestingModule } from '@nestjs/testing';
import { ProductSuppliesService } from './product_supplies.service';

describe('ProductSuppliesService', () => {
  let service: ProductSuppliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSuppliesService],
    }).compile();

    service = module.get<ProductSuppliesService>(ProductSuppliesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
