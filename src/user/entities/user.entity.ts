import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
    role: string;

    @Column()
    username: string;

    @Column()
    password: string;
}
