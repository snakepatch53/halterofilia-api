import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { Championship } from '../entities/championship.entity';

export class ParamChampionshipDto {
    @IsNotEmpty({ message: 'El ID es requerido' })
    @IsInt({ message: 'El ID debe ser un número entero' })
    @Min(1, { message: 'El ID debe ser mayor o igual a 1' })
    @IsExistsInDb(Championship, 'id', {
        message: 'La competición con el ID $value no existe',
    })
    id: number;
}
