import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNumber, IsString } from "class-validator";

@Entity('category')
export class Category extends BaseEntity {

    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;  

    @IsString()
    @Column()
    categoryName: string;
}
