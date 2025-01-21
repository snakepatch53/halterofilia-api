import { Qualification } from 'src/qualification/entities/qualification.entity';
import { Registration } from 'src/registration/entities/registration.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('liftings')
export class Lifting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    weight: number;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    description: string;

    // relationships
    @ManyToOne(() => Registration, (registration) => registration.liftings)
    registration: Registration;

    @OneToMany(() => Qualification, (qualification) => qualification.lifting)
    qualifications: Qualification[];
}
