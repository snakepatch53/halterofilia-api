// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
// import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ) {}

    // Valida credenciales y retorna algo representando al usuario
    async validateUser(username: string, pass: string): Promise<any> {
        // const user = await this.usersService.findByUsername(username);
        // if (!user) return null;

        // Ejemplo simple “hardcodeado”:

        const userLogin = this.usersRepository.findOne({
            where: { username: username, password: pass },
        });

        if (userLogin) return userLogin;
        return null;
    }

    // Genera el token para un usuario
    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user.userId,
            role: user.role,
        };
        // 'sub' es una convención JWT para guardar un identificador principal
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
