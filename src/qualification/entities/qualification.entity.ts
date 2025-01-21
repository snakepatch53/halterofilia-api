import { Judge } from 'src/judge/entities/judge.entity';
import { Lifting } from 'src/lifting/entities/lifting.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('qualifications')
export class Qualification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    valid: boolean;

    // relationships
    @ManyToOne(() => Lifting, (lifting) => lifting.qualifications)
    lifting: Lifting;

    @ManyToOne(() => Judge, (judge) => judge.qualifications)
    judge: Judge;
}
