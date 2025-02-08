import {
    IsDate,
    IsInt,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { User } from 'src/user/entities/user.entity';

export class CreateChampionshipDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(50, {
        message: 'El nombre debe tener como máximo 50 caracteres',
    })
    name: string;

    @IsNotEmpty({ message: 'La fecha es requerida' })
    @IsDate({ message: 'La fecha debe ser una fecha válida' })
    date: Date;

    @IsNotEmpty({ message: 'La descripción es requerida' })
    @IsString({ message: 'La descripción debe ser un texto' })
    @MinLength(10, {
        message: 'La descripción debe tener al menos 10 caracteres',
    })
    @MaxLength(200, {
        message: 'La descripción debe tener como máximo 200 caracteres',
    })
    description: string;

    @IsNotEmpty({ message: 'El teléfono es requerido' })
    @IsPhoneNumber('EC', {
        message: 'El teléfono debe ser un número de teléfono válido de ecuador',
    })
    phone: string;

    @IsNotEmpty({ message: 'El país es requerido' })
    @IsString({ message: 'El país debe ser un texto' })
    @MinLength(3, { message: 'El país debe tener al menos 3 caracteres' })
    @MaxLength(50, {
        message: 'El país debe tener como máximo 50 caracteres',
    })
    country: string;

    @IsNotEmpty({ message: 'La ciudad es requerida' })
    @IsString({ message: 'La ciudad debe ser un texto' })
    @MinLength(3, { message: 'La ciudad debe tener al menos 3 caracteres' })
    @MaxLength(50, {
        message: 'La ciudad debe tener como máximo 50 caracteres',
    })
    city: string;

    @IsNotEmpty({ message: 'La dirección es requerida' })
    @IsString({ message: 'La dirección debe ser un texto' })
    @MinLength(10, {
        message: 'La dirección debe tener al menos 10 caracteres',
    })
    @MaxLength(200, {
        message: 'La dirección debe tener como máximo 200 caracteres',
    })
    address: string;

    @IsNotEmpty({ message: 'La ubicación es requerida' })
    @IsString({ message: 'La ubicación debe ser un texto' })
    @MinLength(10, {
        message: 'La ubicación debe tener al menos 10 caracteres',
    })
    @MaxLength(200, {
        message: 'La ubicación debe tener como máximo 200 caracteres',
    })
    location: string;

    @IsNotEmpty({ message: 'El userId es requerido' })
    @IsInt({ message: 'El userId debe ser un número entero' })
    @IsExistsInDb(User, 'id', {
        message: 'El usuario con el ID $value no existe',
    })
    userId: number;
    get user(): User {
        return { id: this.userId } as User;
    }
}
