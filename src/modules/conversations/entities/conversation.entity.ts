import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { ProductSupply } from 'src/modules/product_supplies/entities/product_supply.entity';
import { ProductDemand } from 'src/modules/product_demands/entities/product_demand.entity';
import { Message } from 'src/modules/messages/entities/message.entity';
@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '关联供应信息',
  })
  supply_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '关联需求信息',
  })
  demand_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '对话发起者id',

    nullable: false,
  })
  initiator_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '对话参与人id',

    nullable: false,
  })
  participant_id: string;

  @Column({
    type: 'text',
    comment: '最后一条消息',
  })
  last_message_id: string;

  @Column({
    type: 'datetime',
    comment: '最后一条消息时间',
  })
  last_message_time: Date;

  @Column({
    type: 'int',
    comment: '未读消息数量',

    default: 0,
  })
  unread_count: number;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
  })
  update_time: Date;

  // 关联对话发起者
  @ManyToOne(() => User, (user) => user.initiatedConversations)
  @JoinColumn({ name: 'initiator_id' })
  initiator: User;

  // 关联对话参与人
  @ManyToOne(() => User, (user) => user.participatedConversations)
  @JoinColumn({ name: 'participant_id' })
  participant: User;

  // 关联供应信息
  @ManyToOne(
    () => ProductSupply,
    (product_supply) => product_supply.conversations,
  )
  @JoinColumn({ name: 'supply_id' })
  product_supply: ProductSupply;

  // 关联需求信息
  @ManyToOne(
    () => ProductDemand,
    (product_demand) => product_demand.conversations,
  )
  @JoinColumn({ name: 'demand_id' })
  product_demand: ProductDemand;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
