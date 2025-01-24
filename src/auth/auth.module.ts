import * as dotenv from 'dotenv';
dotenv.config();

// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthGateway } from './auth.gateway';

@Module({
    imports: [
        // PassportModule nos facilita usar @UseGuards(AuthGuard('jwt')) después
        PassportModule,
        // JwtModule para firmar y verificar tokens
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Clave secreta para firmar el token
            signOptions: { expiresIn: '24h' }, // Ej: 24 horas (ajústalo a tus necesidades)
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AuthGateway],
})
export class AuthModule {}
