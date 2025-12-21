import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 发送验证码
   * @param body 发送验证码Dto
   * @returns
   */
  @Public()
  @Post('send-code')
  @HttpCode(HttpStatus.OK)
  async sendVerificationCode(
    @Body() body: { email: string; type: 'register' | 'login' | 'reset' },
  ) {
    try {
      const result = await this.authService.sendVerificationCode(
        body.email,
        body.type,
      );
      return {
        code: HttpStatus.OK,
        message: result.message,
        data: {
          success: result.success,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('发送验证码失败');
    }
  }

  /**
   * 注册用户
   * @param registerDto 注册用户Dto
   * @returns
   */
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body()
    registerDto: RegisterDto,
  ) {
    try {
      const result = await this.authService.registerWithEmail(
        registerDto.email,
        registerDto.password,
        registerDto.code,
        registerDto.userType,
        registerDto.nickname,
      );
      return {
        code: HttpStatus.CREATED,
        message: '注册成功',
        data: result,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('注册失败');
    }
  }

  /**
   * 密码登录
   * @param body 登录Dto
   * @returns
   */
  @Public()
  @Post('login/password')
  @HttpCode(HttpStatus.OK)
  async loginWithPassword(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    try {
      const result = await this.authService.loginWithPassword(
        body.email,
        body.password,
      );
      return {
        code: HttpStatus.OK,
        message: '登录成功',
        data: result,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('登录失败');
    }
  }

  /**
   * 验证码登录
   * @param body 登录Dto
   * @returns
   */
  @Public()
  @Post('login/code')
  @HttpCode(HttpStatus.OK)
  async loginWithCode(
    @Body()
    body: {
      email: string;
      code: string;
    },
  ) {
    try {
      const result = await this.authService.loginWithCode(
        body.email,
        body.code,
      );
      return {
        code: HttpStatus.OK,
        message: '登录成功',
        data: result,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('登录失败');
    }
  }

  /**
   * 重置密码
   * @param body 重置密码Dto
   * @returns
   */
  @Public()
  @Post('password/reset')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body()
    body: {
      email: string;
      code: string;
      newPassword: string;
    },
  ) {
    try {
      const result = await this.authService.resetPassword(
        body.email,
        body.code,
        body.newPassword,
      );
      return {
        code: HttpStatus.OK,
        message: '重置成功',
        data: result,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('重置失败');
    }
  }
}
