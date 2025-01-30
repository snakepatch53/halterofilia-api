import { Transform, Type } from 'class-transformer';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    ValidateNested,
    ValidatePromise,
} from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { User } from 'src/user/entities/user.entity';

export class CreateInstitutionDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    name: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser un texto' })
    description: string;

    @IsNotEmpty({ message: 'El teléfono es requerido' })
    @IsString({ message: 'El teléfono debe ser un texto' })
    @MinLength(10, { message: 'El teléfono debe tener al menos 10 caracteres' })
    phone: string;

    @IsNotEmpty({ message: 'El país es requerido' })
    @IsString({ message: 'El país debe ser un texto' })
    @MinLength(3, { message: 'El país debe tener al menos 3 caracteres' })
    country: string;

    @IsNotEmpty({ message: 'La ciudad es requerida' })
    @IsString({ message: 'La ciudad debe ser un texto' })
    @MinLength(3, { message: 'La ciudad debe tener al menos 3 caracteres' })
    city: string;

    @IsNotEmpty({ message: 'La dirección es requerida' })
    @IsString({ message: 'La dirección debe ser un texto' })
    @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
    address: string;

    @IsOptional()
    @IsString({ message: 'La ubicación debe ser un texto' })
    @MinLength(5, { message: 'La ubicación debe tener al menos 5 caracteres' })
    location: string;

    @IsInt({ message: 'El userId debe ser un número entero' })
    @IsExistsInDb(User, 'id', {
        message: 'El usuario con el ID $value no existe',
    })
    userId: number;
    get user(): User {
        return { id: this.userId } as User;
    }
}
