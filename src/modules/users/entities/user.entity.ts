import { BaseEntity } from 'modules/public/base.entity';
import {
    Column,
    Entity
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ default: true, type: "boolean" })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;
}
