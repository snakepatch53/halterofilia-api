import { EntityTarget } from 'typeorm';
import { FileSaveOptions } from '../constants/file.constants';
import {
    deleteSingleFile,
    findRepositoryInClass,
    getFilesFromArg,
    getParams,
    saveFileNameInDto,
    saveSingleFile,
} from '../utils/file.utils';
import 'reflect-metadata';
import {
    DTO_METADATA_KEY,
    FILES_METADATA_KEY,
    ID_METADATA_KEY,
} from './file.decorators';

export function DeleteFiles(
    options: FileSaveOptions | FileSaveOptions[],
    entity?: EntityTarget<any>,
) {
    const optionsArray: FileSaveOptions[] = Array.isArray(options)
        ? options
        : [options]; // Normalizamos la opción a un arreglo

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const repository = findRepositoryInClass(this, entity);
            const [idArg] = getParams(
                [ID_METADATA_KEY],
                target,
                propertyKey,
                args,
            );
            const dbField = await repository.findOne({ where: { id: idArg } });

            optionsArray.forEach(async (file) => {
                if (dbField) {
                    const fieldNameOld = dbField[file?.fieldName];
                    if (fieldNameOld)
                        await deleteSingleFile(file.destination, fieldNameOld);
                }
            });

            return await originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
