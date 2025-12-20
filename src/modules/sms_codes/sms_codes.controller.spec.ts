import { Test, TestingModule } from '@nestjs/testing';
import { SmsCodesController } from './sms_codes.controller';
import { SmsCodesService } from './sms_codes.service';

describe('SmsCodesController', () => {
  let controller: SmsCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsCodesController],
      providers: [SmsCodesService],
    }).compile();

    controller = module.get<SmsCodesController>(SmsCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
