// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
// import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ) {}

    // Valida credenciales y retorna algo representando al usuario
    async validateUser(username: string, pass: string): Promise<any> {
        const userLogin = (await this.userRepository
            .createQueryBuilder('user')
            .where('user.username = :username OR user.email = :username', {
                username,
            })
            .addSelect('user.password') // 🔥 Esto trae el password manualmente
            .getOne()) as User;

        if (!userLogin) return null;
        if (
            (userLogin.username !== username && userLogin.email !== username) ||
            !(await compare(pass, userLogin.password))
        )
            return null; // 🔥 Devuelve null si el usuario no existe o la contraseña es incorrecta

        return userLogin;
    }

    verifyToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            return true; // o retornar decoded
        } catch (err) {
            throw new UnauthorizedException('Token invalid');
        }
    }

    // Genera el token para un usuario
    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user.id,
            role: user.role,
        };
        // 'sub' es una convención JWT para guardar un identificador principal
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
