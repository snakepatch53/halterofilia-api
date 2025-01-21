import { Championship } from 'src/championship/entities/championship.entity';
import { Judge } from 'src/judge/entities/judge.entity';
import { Registration } from 'src/registration/entities/registration.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    weight: number;

    @Column()
    gender: string;

    // relationships
    @ManyToOne(() => Championship, (championship) => championship.categories)
    championship: Championship;

    @OneToMany(() => Registration, (registration) => registration.category)
    registrations: Registration[];

    @OneToMany(() => Judge, (judge) => judge.category)
    judges: Judge[];
}
