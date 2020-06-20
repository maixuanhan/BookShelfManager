import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable
} from "typeorm/browser";
import { Label } from "./label";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn() public id: number;
    @Column("text", { nullable: false }) public title: string;
    @Column("text") public authors: string;
    @Column("int", { default: 0 }) public quantity: number;
    @Column("text", { nullable: true }) public description?: string;
    @Column("text", { nullable: true }) public remark?: string;
    @CreateDateColumn() public createdDate?: Date;
    @UpdateDateColumn() public updatedDate?: Date;
    @ManyToMany(type => Label, label => label.books) @JoinTable() public labels: Label[];

    constructor(id?: number, title?: string, authors?: string, quantity?: number, description?: string,
        remark?: string) {
        super();
        if (id) { this.id = id; }
        this.title = title || "";
        this.authors = authors || "";
        this.quantity = quantity || 0;
        this.description = description;
        this.remark = remark;
    }
}
