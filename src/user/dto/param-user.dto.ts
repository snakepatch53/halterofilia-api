import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { User } from '../entities/user.entity';

export class ParamUserDto {
    @IsNotEmpty({ message: 'El ID es requerido' })
    @IsInt({ message: 'El ID debe ser un número entero' })
    @Min(1, { message: 'El ID debe ser mayor o igual a 1' })
    @IsExistsInDb(User, 'id', {
        message: 'El usuario con el ID $value no existe',
    })
    id: number;
}
