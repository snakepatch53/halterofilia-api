import { Registration } from 'src/registration/entities/registration.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('institutions')
export class Institution {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column()
    location: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    // relationship
    @ManyToOne(() => User, (user) => user.institutions, {
        onDelete: 'CASCADE',
    })
    user: User;

    // relationship inverse
    @OneToMany(() => Registration, (registration) => registration.institution)
    registrations: Registration[];
}
