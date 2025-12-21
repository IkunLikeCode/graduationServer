import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

type VerificationCodeType = 'register' | 'login' | 'reset' | 'verify_email';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: Transporter; // 邮件传输器

  constructor(private configService: ConfigService) {
    this.initalizaTransporter();
  }

  // 初始化邮件传送器
  private initalizaTransporter() {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: true,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false, // 不验证证书
      },
    });
  }

  /**
   * 发送验证码邮件
   * @param email 接收者邮箱
   * @param code 验证码
   * @param type 验证码类型
   * @returns 是否发送成功
   */
  async sendVerificationCode(
    email: string,
    code: string,
    type: VerificationCodeType,
  ): Promise<boolean> {
    const subjectMap = {
      register: '注册验证码 - 智慧农业平台',
      login: '登录验证码 - 智慧农业平台',
      reset: '重置密码验证码 - 智慧农业平台',
      verify_email: '验证邮箱验证码 - 智慧农业平台',
    };
    const html = this.generateVerificationHtml(email, code, type);
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('EMAIL_FROM'), // 发送者
        to: email, // 接收者
        subject: subjectMap[type], // 主题
        html, // html 内容
      });
      this.logger.log(`验证码邮件发送成功: ${email}`);
      return true;
    } catch (error) {
      this.logger.error(`验证码邮件发送失败: ${email}`, error);
      return false;
    }
  }

  /**
   * 生成验证码邮件内容
   * @param email 接收者邮箱
   * @param code 验证码
   * @param type 验证码类型
   * @returns 验证码邮件内容
   */
  private generateVerificationHtml(
    email: string,
    code: string,
    type: VerificationCodeType,
  ) {
    return `
     <div style="font-family: 'Microsoft YaHei', sans-serif;">
      <h2 style="color: #4CAF50;">智慧农业平台</h2>
      <p>您的验证码是：</p>
      <h1 style="color: #333; font-size: 32px;">${code}</h1>
      <p>验证码5分钟内有效，请勿泄露给他人。</p>
    </div>
    `;
  }
}
