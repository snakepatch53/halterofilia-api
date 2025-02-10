import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { Judge } from '../entities/judge.entity';

export class ParamJudgeDto {
    @IsNotEmpty({ message: 'El ID es requerido' })
    @IsInt({ message: 'El ID debe ser un número entero' })
    @Min(1, { message: 'El ID debe ser mayor o igual a 1' })
    @IsExistsInDb(Judge, 'id', {
        message: 'El Juez con el ID $value no existe',
    })
    id: number;
}
