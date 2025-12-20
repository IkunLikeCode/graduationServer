import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SmsCodesService } from './sms_codes.service';
import { CreateSmsCodeDto } from './dto/create-sms_code.dto';
import { UpdateSmsCodeDto } from './dto/update-sms_code.dto';

@Controller('sms-codes')
export class SmsCodesController {
  constructor(private readonly smsCodesService: SmsCodesService) {}

  @Post()
  create(@Body() createSmsCodeDto: CreateSmsCodeDto) {
    return this.smsCodesService.create(createSmsCodeDto);
  }

  @Get()
  findAll() {
    return this.smsCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smsCodesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmsCodeDto: UpdateSmsCodeDto) {
    return this.smsCodesService.update(+id, updateSmsCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smsCodesService.remove(+id);
  }
}
