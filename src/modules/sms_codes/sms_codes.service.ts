import { Injectable } from '@nestjs/common';
import { CreateSmsCodeDto } from './dto/create-sms_code.dto';
import { UpdateSmsCodeDto } from './dto/update-sms_code.dto';

@Injectable()
export class SmsCodesService {
  create(createSmsCodeDto: CreateSmsCodeDto) {
    return 'This action adds a new smsCode';
  }

  findAll() {
    return `This action returns all smsCodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} smsCode`;
  }

  update(id: number, updateSmsCodeDto: UpdateSmsCodeDto) {
    return `This action updates a #${id} smsCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} smsCode`;
  }
}
