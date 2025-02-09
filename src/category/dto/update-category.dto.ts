import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { Championship } from 'src/championship/entities/championship.entity';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsNotEmpty({ message: 'El championshipId es requerido' })
    @IsInt({ message: 'El championshipId debe ser un número entero' })
    @IsExistsInDb(Championship, 'id', {
        message: 'La competencia con el ID $value no existe',
    })
    championshipId: number;
    get championship(): Championship {
        return { id: this.championshipId } as Championship;
    }
}
