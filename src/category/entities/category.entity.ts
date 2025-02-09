import { Championship } from 'src/championship/entities/championship.entity';
import { GENDERS } from 'src/common/constants/gender.constants';
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

    @Column({ type: 'enum', enum: GENDERS, default: GENDERS.MASCULINE })
    gender: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    // relationships
    @ManyToOne(() => Championship, (championship) => championship.categories)
    championship: Championship;

    // relationships reverse
    @OneToMany(() => Registration, (registration) => registration.category)
    registrations: Registration[];

    @OneToMany(() => Judge, (judge) => judge.category)
    judges: Judge[];
}
