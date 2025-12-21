import { ProductDemand } from 'src/modules/product_demands/entities/product_demand.entity';
import { ProductSupply } from 'src/modules/product_supplies/entities/product_supply.entity';
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
@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false, // 分类名称 不能为空
    
    comment: '分类名称',
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 100,
    comment: '图标',
    nullable: true,
  })
  icon: string;
  @Column({
    type: 'int',
    default: 0,
    comment: '排序顺序',
  })
  sort_order: number;
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
  // 自关联
  @ManyToOne(() => ProductCategory, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: ProductCategory;

  // 一个分类可以对应多个产品供应信息
  @OneToMany(
    () => ProductSupply,
    (product_supply) => product_supply.product_category,
  )
  product_supplies: ProductSupply[];

  @OneToMany(
    () => ProductDemand,
    (product_demand) => product_demand.product_category,
  )
  product_demands: ProductDemand[];
}
