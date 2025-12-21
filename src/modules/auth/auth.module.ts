import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { EmailVerificationService } from './services/email-verification.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsCode } from '../sms_codes/entities/sms_code.entity';
import { User } from '../users/entities/user.entity';
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailVerificationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User, SmsCode]),
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1Week' },
      }),
    }),
    EmailModule,
  ],
  exports: [AuthService, EmailVerificationService],
})
export class AuthModule {}
