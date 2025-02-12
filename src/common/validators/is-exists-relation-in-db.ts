import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';
import { AppDataSource } from '../database/data-source'; // 🔥 Usamos el DataSource global
import { EntityTarget, Not } from 'typeorm';
import { ExecutionContext } from '@nestjs/common';

@ValidatorConstraint({ async: true })
export class ExistsInDbConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        if (!AppDataSource) {
            console.error(
                '❌ DataSource no ha sido inicializado en `AppDataSource`',
            );
            return false;
        }
        const values = args.object as any;
        const [entity, col1, col2, updateExcludeRow, shouldExist] =
            args.constraints; // 🔥 Extraemos parámetros

        const valueCol1 = values[col1];
        const valueCol2 = values[col2];

        if (!valueCol1 || !valueCol2)
            throw new Error('No se encontraron las columnas en el dto');
        const repository = AppDataSource.getRepository(entity);

        let record = null;
        if (!updateExcludeRow)
            record = await repository.findOne({
                where: { [col1]: valueCol1, [col2]: valueCol2 },
            });
        else {
            const params = values?.params;
            if (!params)
                throw new Error(
                    'Se esperaba un objeto `params` en el dto cuando se quiere excluir un registro',
                );
            const value = params[updateExcludeRow];
            if (!value)
                throw new Error(
                    'Se esperaba un valor en el objeto `params` cuando se quiere excluir un registro',
                );
            record = await repository.findOne({
                where: {
                    [col1]: valueCol1,
                    [col2]: valueCol2,
                    [updateExcludeRow]: Not(value),
                },
            });
        }

        return shouldExist ? !!record : !record; // ✅ Devuelve `true` si cumple la condición
    }
    defaultMessage(args: ValidationArguments): string {
        const [_, column, shouldExist] = args.constraints;
        return shouldExist
            ? `El valor "${args.value}" en el campo "${column}" no existe en la base de datos.`
            : `El valor "${args.value}" en el campo "${column}" ya existe en la base de datos.`;
    }
}

/*
 * ✅ Valida si un campo existe en la base de datos
 * @param entity - La entidad donde buscar (ej. `User`)
 * @param column - El campo a validar (ej. `email`, `id`)
 * @param validationOptions - Opciones de `class-validator`
 */
export function IsExistsRelationInDb(
    entity: EntityTarget<any>,
    column1: string,
    column2: string,
    validationOptions?: ValidationOptions,
    updateExcludeRow?: string,
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, column1, column2, updateExcludeRow, true], // 🔥 `true` significa que el valor debe existir
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
export function IsNotExistsRelationInDb(
    entity: EntityTarget<any>,
    column1: string,
    column2: string,
    validationOptions?: ValidationOptions,
    updateExcludeRow?: string,
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, column1, column2, updateExcludeRow, false], // 🔥 `false` significa que el valor NO debe existir
            validator: ExistsInDbConstraint,
        });
    };
}
