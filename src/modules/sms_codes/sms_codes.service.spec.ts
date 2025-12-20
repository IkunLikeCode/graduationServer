import { Test, TestingModule } from '@nestjs/testing';
import { SmsCodesService } from './sms_codes.service';

describe('SmsCodesService', () => {
  let service: SmsCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsCodesService],
    }).compile();

    service = module.get<SmsCodesService>(SmsCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
