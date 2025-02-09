import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { Category } from '../entities/category.entity';

export class ParamCategoryDto {
    @IsNotEmpty({ message: 'El ID es requerido' })
    @IsInt({ message: 'El ID debe ser un número entero' })
    @Min(1, { message: 'El ID debe ser mayor o igual a 1' })
    @IsExistsInDb(Category, 'id', {
        message: 'La categoria con el ID $value no existe',
    })
    id: number;
}
