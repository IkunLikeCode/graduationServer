import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { UserType } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  userType: UserType;

  @IsString()
  @IsOptional()
  nickname?: string;
}
