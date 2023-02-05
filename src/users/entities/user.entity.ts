import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Order } from '../../orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserType {
  ADMIN = 'admin',
  BENEFICIARY = 'beneficiary',
  DONOR = 'donor',
  DELIVERY = 'delivery',
  STORE = 'store',
}

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column()
  phone?: string;

  @Exclude()
  @ApiProperty()
  @Column()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: UserType, default: UserType.BENEFICIARY })
  user_type: UserType;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @ApiProperty()
  @DeleteDateColumn()
  deleted_at: Date;

  @ApiProperty()
  @OneToMany(type => Order, order => order.user)
  orders: Order[];
}
