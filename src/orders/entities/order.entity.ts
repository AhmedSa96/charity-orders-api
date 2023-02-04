import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    // user as owner
    @ApiProperty()
    @ManyToOne(type => User, user => user.orders, { onDelete: 'CASCADE' })
    user: User;


}
