import { Category } from 'src/category/entities/category.entity';
import { Qualification } from 'src/qualification/entities/qualification.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('judges')
export class Judge {
    @PrimaryGeneratedColumn()
    id: number;

    // relationships
    @ManyToOne(() => Category, (category) => category.judges)
    category: Category;

    @ManyToOne(() => User, (user) => user.judges)
    user: User;

    @OneToMany(() => Qualification, (qualification) => qualification.judge)
    qualifications: Qualification[];
}
