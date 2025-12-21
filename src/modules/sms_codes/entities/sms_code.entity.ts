import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
@Index('idx_user_id', ['user'])
@Index('idx_email_type', ['email', 'verification_type'])
@Entity('sms_codes')
export class SmsCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    length: 100,
    comment: '邮箱地址',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 6,
    comment: '验证码',
    nullable: false,
  })
  code: string;

  @Column({
    type: 'enum',
    enum: ['register', 'login', 'reset', 'verify_email'],
    comment: '验证码类型 (register:注册,login:登录,reset:重置密码,verify_email:验证邮箱)',
    nullable: false,
  })
  verification_type: string;
  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: User;
  @Column({
    type: 'boolean',
    comment: '是否使用过',
    default: false,
  })
  is_used: boolean;
  @Column({
    type: 'timestamp',
    comment: '过期时间',
    nullable: false,
  })
  expires_at: Date;
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  created_at: Date;
}
