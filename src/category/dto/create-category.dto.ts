import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Championship } from 'src/championship/entities/championship.entity';
import { GENDERS } from 'src/common/constants/gender.constants';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'El peso es requerido' })
    @IsInt({ message: 'El peso debe ser un número entero' })
    weight: number;

    @IsNotEmpty({ message: 'El género es requerido' })
    @IsString({ message: 'El género debe ser un texto' })
    @IsEnum(GENDERS, {
        message: `El género debe ser uno de los siguientes valores: ${Object.values(GENDERS).join(', ')}`,
    })
    gender: string;

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
