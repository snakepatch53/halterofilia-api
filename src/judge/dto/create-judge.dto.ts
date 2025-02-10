import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { User } from 'src/user/entities/user.entity';

export class CreateJudgeDto {
    @IsOptional()
    @Transform(({ value }): boolean => {
        if (typeof value === 'boolean') return value; // Si ya es booleano, no lo cambia
        if (typeof value === 'string')
            return value.toLowerCase() === 'true' || value === '1'; // "true" o "1" → true
        if (typeof value === 'number') return value === 1; // 1 → true, 0 → false
        return false; // Si no es un valor esperado, se asigna false
    })
    @IsBoolean({ message: 'El supervisor debe ser un booleano' })
    supervisor: any; // any para aceptar string, number y boolean y transformarlos de ser necesario

    @IsNotEmpty({ message: 'La categoryId es requerido' })
    @IsInt({ message: 'La categoryId debe ser un número entero' })
    @IsExistsInDb(Category, 'id', {
        message: 'La categoria con el ID $value no existe',
    })
    categoryId: number;
    get category(): Category {
        return { id: this.categoryId } as Category;
    }

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
