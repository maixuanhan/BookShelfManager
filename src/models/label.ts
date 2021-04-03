import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany,
} from 'typeorm/browser';
import { Book } from './book';

@Entity()
export class Label extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column('text', { nullable: false, unique: true })
    public name!: string;

    @Column('text', { nullable: true })
    public description?: string;

    @CreateDateColumn()
    public createdDate?: Date;

    @UpdateDateColumn()
    public updatedDate?: Date;

    @ManyToMany(() => Book, book => book.labels)
    public books?: Book[];
}
