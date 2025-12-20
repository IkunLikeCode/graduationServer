import { Module } from '@nestjs/common';
import { SmsCodesService } from './sms_codes.service';
import { SmsCodesController } from './sms_codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsCode } from './entities/sms_code.entity';
@Module({
  controllers: [SmsCodesController],
  providers: [SmsCodesService],
  imports: [TypeOrmModule.forFeature([SmsCode])],
})
export class SmsCodesModule {}
