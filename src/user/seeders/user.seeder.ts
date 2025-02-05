import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { encryptPassword } from 'src/common/utils/encrypt.password';

@Injectable()
export class UserSeeder implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async onModuleInit() {
        await this.run();
    }

    async run() {
        const userCount = await this.userRepository.count();
        if (userCount > 0) {
            console.log('🔹 Usuarios ya existen. No se insertan nuevos.');
            return;
        }

        console.log('🚀 Insertando usuarios de prueba...');

        const users = [
            {
                name: 'Super',
                lastname: 'Administrador',
                dni: 'admin',
                email: 'admin',
                username: 'admin',
                password: 'admin1234',
                role: 'admin',
            },
        ];

        for (const user of users) {
            const hashedPassword = await encryptPassword(user.password);
            await this.userRepository.save({
                ...user,
                password: hashedPassword,
            });
        }

        console.log('✅ Usuarios insertados correctamente.');
    }
}
