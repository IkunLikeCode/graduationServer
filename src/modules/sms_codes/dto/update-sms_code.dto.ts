import { PartialType } from '@nestjs/mapped-types';
import { CreateSmsCodeDto } from './create-sms_code.dto';

export class UpdateSmsCodeDto extends PartialType(CreateSmsCodeDto) {}
