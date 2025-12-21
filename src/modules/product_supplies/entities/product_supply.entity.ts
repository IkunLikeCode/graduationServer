import { Conversation } from 'src/modules/conversations/entities/conversation.entity';
import { ProductCategory } from 'src/modules/product_categories/entities/product_category.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
@Entity('product_supplies')
export class ProductSupply {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '农户Id',
  })
  user_id: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '供应标题',
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
    comment: '产品品种',
    nullable: false,
  })
  product_variety: string;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    comment: '产量(kg)',
  })
  yield: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    comment: '单价(元/kg)',
  })
  price: number;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '单位',
  })
  unit: string;
  @Column({
    type: 'varchar',
    length: 100,
    comment: '产地',
    nullable: true,
  })
  origin_place: string;

  @Column({
    type: 'date',
    nullable: true,
    comment: '收获时间',
  })
  harvest_time: Date;

  @Column({
    type: 'text',
    nullable: true,
    comment: '描述',
  })
  description: string;

  @Column({
    type: 'json',
    nullable: true,
    comment: '图片',
  })
  images: any;
  @Column({
    type: 'enum',
    enum: ['pending', 'published', 'sold', 'offline'],
    default: 'pending',
    comment:
      '状态(pending:待发布, published:已发布, sold:已销售, offline:已下架)',
  })
  status: string;

  @Column({
    type: 'int',
    default: 0,
    comment: '查看次数',
  })
  view_count: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '联系次数',
  })
  contact_count: number;
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
  // 一个用户可以发布多个产品供应信息
  @ManyToOne(() => User, (user) => user.product_supplies)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // 一个产品对应一个分类
  @ManyToOne(
    () => ProductCategory,
    (product_category) => product_category.product_supplies,
  )
  @JoinColumn({ name: 'category_id' })
  product_category: ProductCategory;

  // 一个产品供应信息可以有多个对话
  @OneToMany(() => Conversation, (conversation) => conversation.product_supply)
  conversations: Conversation[];
}
