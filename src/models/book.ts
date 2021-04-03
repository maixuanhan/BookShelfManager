import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm/browser';
import { Label } from './label';

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column('text', { nullable: false })
    public title!: string;

    @Column('text', { nullable: true })
    public authors?: string;

    @Column('int', { default: 0 })
    public quantity = 0;

    @Column('text', { nullable: true })
    public note?: string;

    @Column('text', { nullable: true })
    public remark?: string;

    @CreateDateColumn()
    public createdDate?: Date;

    @UpdateDateColumn()
    public updatedDate?: Date;

    @ManyToMany(() => Label, label => label.books)
    @JoinTable()
    public labels?: Label[];
}
