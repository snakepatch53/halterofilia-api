import {
    isNotEmpty,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'El username es requerido' })
    @IsString({ message: 'El username debe ser un texto' })
    username: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;

    // Opcional: socketId para notificar a un cliente específico
    @IsOptional()
    @IsString({ message: 'El socketId debe ser un texto' })
    socketId: string;
}

export class LogoutDto {
    // Opcional: socketId para notificar a un cliente específico
    @IsOptional()
    @IsString({ message: 'El socketId debe ser un texto' })
    socketId: string;
}
