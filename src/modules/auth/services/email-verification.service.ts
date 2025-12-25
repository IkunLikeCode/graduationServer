//  Email验证服务（集成sms_codes表）
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { SmsCode } from '../../sms_codes/entities/sms_code.entity';
import { EmailService } from '../../email/email.service';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
// 引入node自带的crypto模块
import crypto from 'crypto';
@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name);
  constructor(
    @InjectRepository(SmsCode)
    private readonly smsCodesRepository: Repository<SmsCode>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * 发送验证码邮件
   * @param email 接收者邮箱
   * @param type 验证码类型
   */
  async sendVerificationCode(
    email: string,
    type: 'register' | 'login' | 'reset',
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // 1.验证邮箱格式
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(email)) {
        throw new BadRequestException('邮箱格式错误');
      }
      // 2.检查冷却期
      const recentCode = await this.smsCodesRepository.findOne({
        where: {
          email,
          verification_type: type,
          is_used: false,
          expires_at: MoreThan(new Date()),
        },
      });
      if (recentCode) {
        const elapsedMs = Date.now() - recentCode.created_at.getTime();
        const safeElapsedMs = Math.max(0, elapsedMs);
        const remainingMs = Math.max(
          0,
          Math.min(60 * 1000, 60 * 1000 - safeElapsedMs),
        );
        if (remainingMs > 0) {
          throw new BadRequestException(`请${5}分钟后重试`);
        }
      }
      // 3.业务校验
      if (type === 'register') {
        const existingUser = await this.usersRepository.findOne({
          where: {
            email,
          },
        });
        if (existingUser) {
          throw new BadRequestException('邮箱已被注册');
        }
      } else if (type === 'login' || type === 'reset') {
        const existingUser = await this.usersRepository.findOne({
          where: {
            email,
          },
        });
        if (!existingUser) {
          throw new BadRequestException('邮箱未注册');
        }
      }
      // 4.生成验证码 和 过期时间
      const code = Math.random().toString().slice(2, 8);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      const emailCode = this.smsCodesRepository.create({
        email,
        code,
        verification_type: type,
        expires_at: expiresAt,
        is_used: false,
      });
      await this.smsCodesRepository.save(emailCode);

      // 6.发送邮件 调用(emailService中的发送邮件函数)
      const sendResult = await this.emailService.sendVerificationCode(
        email,
        code,
        type,
      );
      if (!sendResult) {
        throw new BadRequestException('验证码邮件发送失败');
      }
      return {
        success: true,
        message: '验证码邮件发送成功',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * 验证验证码
   * @param email 接收者邮箱
   * @param code 验证码
   * @param type 验证码类型
   * @returns 是否验证成功
   */
  async verifyCode(
    email: string,
    code: string,
    type: 'register' | 'login' | 'reset',
  ): Promise<boolean> {
    // 1.获取最近的未使用验证码
    const emailCode = await this.smsCodesRepository.findOne({
      where: {
        email,
        code,
        verification_type: type,
        expires_at: MoreThan(new Date()),
        is_used: false,
      },
      order: {
        created_at: 'DESC',
      },
    });
    // 2.验证验证码是否存在
    if (!emailCode) {
      return false;
    }
    // 3.验证成功后，将验证码标记为已使用
    emailCode.is_used = true;
    await this.smsCodesRepository.save(emailCode);
    return true;
  }

  /**
   * 邮箱验证登录
   * @param email 接收者邮箱
   * @param code 验证码
   * @returns
   */
  async loginWithCode(
    email: string,
    code: string,
  ): Promise<{
    message: string;
    token: string;
    user: User;
  }> {
    try {
      // 1.验证验证码
      const isCodeValid = await this.verifyCode(email, code, 'login');
      if (!isCodeValid) {
        throw new BadRequestException('验证码错误');
      }
      // 2.获取用户
      const user = await this.usersRepository.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new BadRequestException('用户不存在');
      }
      // 3.生成token
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        userType: user.user_type,
      });
      return {
        message: '登录成功',
        token,
        user,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * 重置密码
   * @param email 接收者邮箱
   * @param code 验证码
   * @param newPassword 新密码
   */
  async resetPassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<boolean> {
    // 1.验证验证码
    const isCodeValid = await this.verifyCode(email, code, 'reset');
    if (!isCodeValid) {
      throw new BadRequestException('验证码错误');
    }
    // 2.获取用户
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    // 3.更新密码
    user.password = this.hashPassword(newPassword);
    await this.usersRepository.save(user);
    return true;
  }

  // 密码加密
  hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
  /**
   * 清理过期验证码
   */
  async cleanExpiredCodes(): Promise<number> {
    const result = await this.smsCodesRepository
      .createQueryBuilder()
      .delete()
      .where('expires_at < :now', { now: new Date() })
      .orWhere('is_used = :is_used', { is_used: true })
      .execute();
    return result.affected || 0;
  }
}
