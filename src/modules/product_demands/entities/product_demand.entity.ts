import { Conversation } from 'src/modules/conversations/entities/conversation.entity';
import { ProductCategory } from 'src/modules/product_categories/entities/product_category.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
@Entity('product_demands')
export class ProductDemand {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,

    comment: '采购商Id',
  })
  user_id: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,

    comment: '需求标题',
  })
  title: string;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,

    comment: '产品名称',
  })
  product_name: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,

    comment: '分类Id',
  })
  category_id: string;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,

    comment: '采购品种',
  })
  product_variety: string;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    comment: '需求数量(kg)',
  })
  quantity: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    comment: '期望价格下限',
  })
  expected_price_min: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    comment: '期望价格上限',
  })
  expected_price_max: number;
  @Column({
    type: 'date',
    nullable: true,
    comment: '截止时间',
  })
  deadline: Date;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,

    comment: '配送地址',
  })
  deliver_address: string;
  @Column({
    type: 'text',
    nullable: true,

    comment: '需求描述',
  })
  description: string;
  @Column({
    type: 'enum',
    enum: ['pending', 'published', 'fulfilled', 'closed'],
    default: 'pending',
    comment:
      '状态(pending:待发布, published:已发布, fulfilled:已满足, closed:已关闭)',
  })
  status: string;
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  created_at: Date;
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
  })
  updated_at: Date;
  // 一个用户可以发布多个采购需求
  @ManyToOne(() => User, (user) => user.product_demands)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // 一个采购需求对应一个分类
  @ManyToOne(
    () => ProductCategory,
    (product_category) => product_category.product_demands,
  )
  @JoinColumn({ name: 'category_id' })
  product_category: ProductCategory;

  // 一个采购需求可以有多个对话
  @OneToMany(() => Conversation, (conversation) => conversation.product_demand)
  conversations: Conversation[];
}
