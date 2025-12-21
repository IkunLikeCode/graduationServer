import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { EmailVerificationService } from './services/email-verification.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { UserType } from '../users/entities/user.entity';
// 引入node自带的crypto模块
import crypto from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  /**
   * 发送验证码
   * @param email 邮箱
   * @param type 验证码类型
   * @returns
   */
  async sendVerificationCode(
    email: string,
    type: 'register' | 'login' | 'reset',
  ) {
    return await this.emailVerificationService.sendVerificationCode(
      email,
      type,
    );
  }

  /**
   * 邮箱注册
   * @param email 邮箱
   * @param code 验证码
   * @param password 密码
   * @param userType 用户类型
   * @param nickname 昵称
   * @returns
   */
  async registerWithEmail(
    email: string,
    code: string,
    password: string,
    userType: UserType,
    nickname?: string,
  ) {
    // 1.验证邮箱验证码
    const isValid = await this.emailVerificationService.verifyCode(
      email,
      code,
      'register',
    );

    if (!isValid) {
      throw new UnauthorizedException('验证码错误');
    }

    // 2.检查邮箱是否被注册过
    const existingUser = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new UnauthorizedException('邮箱已被注册');
    }

    // 3.创建用户
    const user = this.usersRepository.create({
      email,
      password: this.hashPassword(password),
      user_type: userType,
      nickname: nickname || email.split('@')[0],
      email_verified: true,
    });
    const savedUser = await this.usersRepository.save(user);
    // 4.生成jwt token
    const token = this.jwtService.sign({
      sub: savedUser.id,
      email: savedUser.email,
      user_type: savedUser.user_type,
    });
    return {
      user,
      token,
    };
  }

  /**
   * 密码登录
   * @param email 邮箱
   * @param password 密码
   * @returns
   */
  async loginWithPassword(email: string, password: string) {
    // 1.检查邮箱是否存在
    const user = await this.usersRepository.findOne({
      where: {
        email,
        status: 0,
      },
    });
    if (!user) {
      throw new UnauthorizedException('邮箱不存在');
    }
    //2.检查密码是否正确
    const isPasswordValid = this.hashPassword(password) === user.password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('密码错误');
    }
    //3.生成jwt token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      user_type: user.user_type,
    });
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
      message: '登录成功',
    };
  }

  /**
   * 邮箱验证码登录
   * @param email 邮箱
   * @param code 验证码
   * @returns
   */
  async loginWithCode(email: string, code: string) {
    return await this.emailVerificationService.loginWithCode(email, code);
  }

  /**
   * 重置密码
   * @param email 邮箱
   * @param code 验证码
   * @param newPassword 新密码
   */
  async resetPassword(email: string, code: string, newPassword: string) {
    return await this.emailVerificationService.resetPassword(
      email,
      code,
      newPassword,
    );
  }

  hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}
