import { Category } from 'src/category/entities/category.entity';
import { Qualification } from 'src/qualification/entities/qualification.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity('judges')
@Unique(['user', 'category'])
export class Judge {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'boolean', default: false })
    supervisor: boolean;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    // relationships
    @ManyToOne(() => Category, (category) => category.judges)
    category: Category;

    @ManyToOne(() => User, (user) => user.judges)
    user: User;

    // relationships reverse
    @OneToMany(() => Qualification, (qualification) => qualification.judge)
    qualifications: Qualification[];
}
