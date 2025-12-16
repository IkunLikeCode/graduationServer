import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'name', //字段名
    type: 'varchar',
    length: 255,
    charset: 'utf8mb4',
  })
  name: string;
}
