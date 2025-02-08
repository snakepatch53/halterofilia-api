import { PartialType } from '@nestjs/mapped-types';
import { CreateChampionshipDto } from './create-championship.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsExistsInDb } from 'src/common/validators/is-exists-in-db';
import { User } from 'src/user/entities/user.entity';

export class UpdateChampionshipDto extends PartialType(CreateChampionshipDto) {
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
