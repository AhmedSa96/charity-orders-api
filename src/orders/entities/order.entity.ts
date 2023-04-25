import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity()
export class Order {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    startDateTime: Date;

    @ApiProperty()
    @Column()
    endDateTime: Date;

    @ApiProperty()
    @Column()
    latitude: number;

    @ApiProperty()
    @Column()
    longitude: number;

    @ApiProperty()
    @ManyToOne(type => User, user => user.orders, { onDelete: 'CASCADE' })
    user: User;

    @ApiProperty()
    @ManyToMany(type => Product, product => product.orders)
    products: Product[];

    @Exclude()
    @ApiProperty()
    @DeleteDateColumn()
    deleted_at?: Date;
}
