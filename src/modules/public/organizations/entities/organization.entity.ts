import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../modules/public/base.entity';

@Entity({ name: 'organizations' })
export class Organization extends BaseEntity {

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    schemaName: string;
}