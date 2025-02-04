import { FileSaveOptions } from '../constants/file.constants';
import {
    getFilesFromArg,
    getParams,
    saveFileNameInDto,
    saveSingleFile,
} from '../utils/file.utils';
import { FILES_METADATA_KEY, DTO_METADATA_KEY } from './file.decorators';

export function SaveFiles(options: FileSaveOptions | FileSaveOptions[]) {
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
            const [dtoArg, filesArg] = getParams(
                [DTO_METADATA_KEY, FILES_METADATA_KEY],
                target,
                propertyKey,
                args,
            );
            await getFilesFromArg(filesArg, optionsArray, async (file, key) => {
                const savedName = await saveSingleFile(file, {
                    fieldName: file.fieldname,
                    destination: file.destination,
                });
                saveFileNameInDto(dtoArg, file.fieldname, savedName);
                filesArg[key].savedName = savedName;

                return savedName;
            });

            return await originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
