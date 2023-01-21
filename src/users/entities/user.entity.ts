import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserResource } from '../models/user-resource';

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
  first_name: string;

  @ApiProperty()
  @Column()
  last_name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  phone: string;

  @Exclude()
  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  // enum: UserType,
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

}
