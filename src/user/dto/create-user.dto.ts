import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    name: string;

    @IsNotEmpty({ message: 'El username es requerido' })
    @IsString({ message: 'El username debe ser un texto' })
    @MinLength(5, { message: 'El username debe tener al menos 5 caracteres' })
    username: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
}
