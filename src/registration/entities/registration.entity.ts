import { Category } from 'src/category/entities/category.entity';
import { Institution } from 'src/institution/entities/institution.entity';
import { Lifting } from 'src/lifting/entities/lifting.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('registrations')
export class Registration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body_weight: number;

    @Column()
    approved_institution: boolean;

    @Column()
    approved_inscription: boolean;

    // relationships
    @OneToMany(() => Lifting, (lifting) => lifting.registration)
    liftings: Lifting[];

    @ManyToOne(() => Category, (category) => category.registrations)
    category: Category;

    @ManyToOne(() => Institution, (institution) => institution.registrations)
    institution: Institution;

    @ManyToOne(() => User, (user) => user.registrations)
    user: User;
}
