import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    MinLength,
} from 'class-validator';
import { ROLE } from 'src/common/constants/role.constants';

export class CreateUserDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    name: string;

    @IsNotEmpty({ message: 'El apellido es requerido' })
    @IsString({ message: 'El apellido debe ser un texto' })
    @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    lastname: string;

    @IsNotEmpty({ message: 'El DNI es requerido' })
    @IsString({ message: 'El DNI debe ser un texto' })
    @Length(10, 10, { message: 'El DNI debe tener exactamente 10 caracteres' })
    dni: string;

    @IsNotEmpty({ message: 'El email es requerido' })
    @IsString({ message: 'El email debe ser un texto' })
    @IsEmail({}, { message: 'El email debe ser un email válido' })
    email: string;

    @IsNotEmpty({ message: 'El username es requerido' })
    @IsString({ message: 'El username debe ser un texto' })
    @MinLength(5, { message: 'El username debe tener al menos 5 caracteres' })
    username: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;

    @IsOptional()
    @IsString({ message: 'El rol debe ser un texto' })
    @IsEnum(ROLE, {
        message: `El rol debe ser uno de los siguientes valores: ${Object.values(ROLE).join(', ')}`,
    })
    role: ROLE;
}
