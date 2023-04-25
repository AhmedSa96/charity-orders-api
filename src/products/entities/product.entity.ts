import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @ManyToOne((type) => User, (user) => user.products, { onDelete: 'CASCADE' })
  owner: User;

  @ManyToMany((type) => Order, (order) => order.products)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
