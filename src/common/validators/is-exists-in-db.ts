import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';
import { AppDataSource } from '../database/data-source'; // 🔥 Usamos el DataSource global
import { EntityTarget } from 'typeorm';

@ValidatorConstraint({ async: true })
export class ExistsInDbConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        if (!AppDataSource) {
            console.error(
                '❌ DataSource no ha sido inicializado en `AppDataSource`',
            );
            return false;
        }

        const [entity, column, shouldExist] = args.constraints; // 🔥 Extraemos parámetros
        const repository = AppDataSource.getRepository(entity);

        const record = await repository.findOne({ where: { [column]: value } });

        return shouldExist ? !!record : !record; // ✅ Devuelve `true` si cumple la condición
    }

    defaultMessage(args: ValidationArguments): string {
        const [_, column, shouldExist] = args.constraints;
        return shouldExist
            ? `El valor "${args.value}" en el campo "${column}" no existe en la base de datos.`
            : `El valor "${args.value}" en el campo "${column}" ya existe en la base de datos.`;
    }
}

/**
 * ✅ Valida si un campo existe en la base de datos
 * @param entity - La entidad donde buscar (ej. `User`)
 * @param column - El campo a validar (ej. `email`, `id`)
 * @param validationOptions - Opciones de `class-validator`
 */
export function IsExistsInDb(
    entity: EntityTarget<any>,
    column: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, column, true], // 🔥 `true` significa que el valor debe existir
            validator: ExistsInDbConstraint,
        });
    };
}

/**
 * ✅ Valida si un campo NO existe en la base de datos
 * @param entity - La entidad donde buscar (ej. `User`)
 * @param column - El campo a validar (ej. `email`, `id`)
 * @param validationOptions - Opciones de `class-validator`
 */
export function IsNotExistsInDb(
    entity: EntityTarget<any>,
    column: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, column, false], // 🔥 `false` significa que el valor NO debe existir
            validator: ExistsInDbConstraint,
        });
    };
}
