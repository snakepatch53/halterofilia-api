import { Exclude, Transform } from 'class-transformer';
import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { User } from 'src/user/entities/user.entity';
import { CreateInstitutionDto } from './create-institution.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInstitutionDto extends PartialType(CreateInstitutionDto) {
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
