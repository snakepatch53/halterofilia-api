import { ArrayUnique, IsArray, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { getEntityRelations } from 'src/common/utils/entity-relations.util';
import { User } from '../entities/user.entity';

export class QueryUserDto {
    private static readonly VALID_RELATIONS = getEntityRelations(User, true);

    @IsOptional()
    @IsArray({ message: 'include debe ser una lista de strings' }) // 🔥 Acepta un array
    @ArrayUnique({ message: 'Los valores en include deben ser únicos' }) // 🔥 Evita duplicados
    @Transform(({ value }) => {
        if (!value) return []; // 🔥 Si no hay `include`, devolver un array vacío
        if (typeof value === 'string') return value.split(','); // 🔥 Si es un string, convertirlo en array
        if (Array.isArray(value)) return value; // 🔥 Si ya es un array, mantenerlo
        return []; // 🔥 Si es cualquier otro tipo, devolver array vacío
    })
    @IsIn(QueryUserDto.VALID_RELATIONS, {
        each: true,
        message: (args) => {
            return `Relacion/es: ${args.value} inválida/s ❌. Relacion/es permitida/s: ${QueryUserDto.VALID_RELATIONS.join(', ')}`;
        },
    })
    include?: string[];
}
