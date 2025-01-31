import * as dotenv from 'dotenv';
dotenv.config();

// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Cómo se extrae el token. En este caso: Bearer Token en header Authorization
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // false -> lanza error si el token está expirado
            secretOrKey: process.env.JWT_SECRET, // Mismo secret que en JwtModule
        });
    }

    async validate(payload: any) {
        // Aquí puedes hacer consultas extra si quieres
        // Lo que retornes se inyecta en req.user

        return {
            id: payload.sub,
            username: payload.username,
            role: payload.role,
        };
    }
}
