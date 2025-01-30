// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LogoutDto } from './dto/auth.dto';
import { AuthGateway } from './auth.gateway';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly authGateway: AuthGateway,
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(
            loginDto.username,
            loginDto.password,
        );

        if (!user) throw new UnauthorizedException('Credenciales inválidas');
        delete user.password; // No enviamos la contraseña

        // Generamos el token
        const token = await this.authService.login(user);

        // Guardamos el socketId del cliente
        const { socketId } = loginDto;

        // creamos una respuesta
        const response = {
            message: 'You are logged in!',
            ...token,
            user,
        };

        if (!socketId) return response;

        this.authGateway.notifyOnLogin(socketId, {
            ...response,
            isLogged: true,
        });
        return response;
    }

    @Post('logout')
    async logout(@Body() logoutDto: LogoutDto) {
        const { socketId } = logoutDto;
        const response = {
            message: 'You are logged out!',
            isLogged: false,
        };
        if (!socketId) return response;

        // Lógica de logout, invalidar sesión en DB si tienes
        this.authGateway.notifyOnLogin(socketId, {
            message: 'You are logged out!',
            isLogged: false,
        });
        return response;
    }
}
