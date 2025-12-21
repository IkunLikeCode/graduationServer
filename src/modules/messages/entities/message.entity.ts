import { Conversation } from 'src/modules/conversations/entities/conversation.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '对话id',

    nullable: false,
  })
  conversation_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '发送者id',

    nullable: false,
  })
  sender_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '接收者id',

    nullable: false,
  })
  receiver_id: string;

  @Column({
    type: 'text',
    comment: '消息内容',

    nullable: false,
  })
  content: string;

  @Column({
    type: 'enum',
    enum: ['text', 'image', 'file'],
    comment: '消息类型',
    default: 'text',
  })
  message_type: string;

  @Column({
    type: 'boolean',
    comment: '是否已读',
    default: false,
  })
  is_read: boolean;

  @Column({
    type: 'datetime',
    comment: '读取时间',
    nullable: true,
  })
  read_time: Date;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  create_time: Date;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}
