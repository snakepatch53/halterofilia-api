import { ROLE } from 'src/common/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
    role: string;

    @Column()
    username: string;

    @Column()
    password: string;
}
