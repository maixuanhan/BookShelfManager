import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn,
} from 'typeorm/browser';

@Entity()
export class ApplicationSetting extends BaseEntity {
    @PrimaryGeneratedColumn() public id: number;
    @Column({ nullable: false, unique: true }) public name: string;
    @Column({ nullable: false }) public value: string;
    @Column() public description?: string;
    @CreateDateColumn() public createdDate: Date;
    @UpdateDateColumn() public updatedDate: Date;

    constructor(id: number, name: string, value: string, description?: string) {
        super();
        this.id = id;
        this.name = name;
        this.value = value;
        this.description = description;
        this.createdDate = new Date();
        this.updatedDate = new Date();
    }
}
