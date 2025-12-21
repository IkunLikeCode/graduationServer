import { Conversation } from 'src/modules/conversations/entities/conversation.entity';
import { ProductDemand } from 'src/modules/product_demands/entities/product_demand.entity';
import { ProductSupply } from 'src/modules/product_supplies/entities/product_supply.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

export enum UserType {
  Farmer = 'farmer',
  Buyer = 'buyer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false, // 邮箱 不能为空
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false, // 密码 不能为空
    select: false, // 密码 不参与查询
  })
  password: string;
  @Column({
    type: 'varchar',
    length: 100,
    comment: '用户昵称',
  })
  nickname: string;
  @Column({
    type: 'varchar',
    length: 100,
    comment: '用户头像',
  })
  avatar: string;
  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.Farmer,
    nullable: false,
    comment: '用户类型:农户/采购商',
  })
  user_type: UserType;
  @Column({
    type: 'varchar',
    length: 50,
    comment: '用户真实姓名',
  })
  real_name: string;
  @Column({
    type: 'varchar',
    length: 100,
    comment: '用户公司名称',
  })
  company: string;
  @Column({
    type: 'varchar',
    length: 255,
    comment: '地址',
  })
  address: string;
  @Column({
    type: 'boolean',
    default: false,
    comment: '邮箱是否认证',
  })
  email_verified: boolean;
  // 创建时间
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  created_at: Date;
  // 更新时间
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
  })
  updated_at: Date;
  @Column({
    type: 'tinyint',
    default: 0,
    comment: '用户状态:0-正常,1-禁用',
  })
  status: number;

  // 一个用户可以发布多个产品供应信息
  @OneToMany(() => ProductSupply, (product_supply) => product_supply.user)
  product_supplies: ProductSupply[];
  // 一个用户可以发布多个采购需求
  @OneToMany(() => ProductDemand, (product_demand) => product_demand.user)
  product_demands: ProductDemand[];

  // 一个用户可以发起多个对话
  @OneToMany(() => Conversation, (conversation) => conversation.initiator)
  initiatedConversations: Conversation[];
  // 一个用户可以参与多个对话
  @OneToMany(() => Conversation, (conversation) => conversation.participant)
  participatedConversations: Conversation[];
}
