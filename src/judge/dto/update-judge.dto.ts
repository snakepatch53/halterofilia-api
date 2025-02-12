import { PartialType } from '@nestjs/mapped-types';
import { CreateJudgeDto } from './create-judge.dto';
import { IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { IsNotExistsRelationInDb } from 'src/common/validators/is-exists-relation-in-db';
import { Judge } from '../entities/judge.entity';

export class UpdateJudgeDto extends PartialType(CreateJudgeDto) {
    @IsOptional()
    params?;

    @IsNotEmpty({ message: 'El userId es requerido' })
    @IsInt({ message: 'El userId debe ser un número entero' })
    @IsExistsInDb(User, 'id', {
        message: 'El usuario con el ID $value no existe',
    })
    @IsNotExistsRelationInDb(
        Judge,
        'user',
        'category',
        {
            message: 'El juez ya existe en la categoría',
        },
        'id',
    )
    userId: number;
    get user(): User {
        return { id: this.userId } as User;
    }

    @IsNotEmpty({ message: 'La categoryId es requerido' })
    @IsInt({ message: 'La categoryId debe ser un número entero' })
    @IsExistsInDb(Category, 'id', {
        message: 'La categoria con el ID $value no existe',
    })
    categoryId: number;
    get category(): Category {
        return { id: this.categoryId } as Category;
    }
}
