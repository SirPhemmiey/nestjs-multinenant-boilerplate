import { Column, CreateDateColumn, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @Column()
    @Generated("increment")
    @PrimaryColumn()
    id: number;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        nullable: true,
        type: 'timestamp without time zone',
        name: 'updated_at',
    })
    updatedAt: Date;
}