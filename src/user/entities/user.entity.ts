import { Championship } from 'src/championship/entities/championship.entity';
import { ROLE } from 'src/common/constants/role.constants';
import { Institution } from 'src/institution/entities/institution.entity';
import { Judge } from 'src/judge/entities/judge.entity';
import { Registration } from 'src/registration/entities/registration.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    dni: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    photo?: string;

    @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
    role: string;

    // Relations
    @OneToMany(() => Institution, (institution) => institution.user)
    institutions: Institution[];

    @OneToMany(() => Registration, (registration) => registration.user)
    registrations: Registration[];

    @OneToMany(() => Judge, (judge) => judge.user)
    judges: Judge[];

    @OneToMany(() => Championship, (championship) => championship.user)
    championships: Championship[];
}
