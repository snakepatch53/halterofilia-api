import { BadRequestException } from '@nestjs/common';
import { unlink, writeFile } from 'fs';
import { join, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileSaveOptions } from '../constants/file.constants';
import { AppDataSource } from '../database/data-source';
import { EntityTarget } from 'typeorm';

export async function saveSingleFile(
    file: any,
    option: FileSaveOptions,
): Promise<string> {
    // Generamos un nombre único usando UUID y conservamos la extensión del archivo original
    const uniqueFileName = `${option.fieldName}-${uuidv4()}${extname(file.originalname)}`;
    const filePath = join(option.destination, uniqueFileName);
    return new Promise<string>((resolve, reject) => {
        writeFile(filePath, file.buffer, (err) => {
            if (err) {
                return reject(
                    new BadRequestException(
                        `Error al guardar el archivo: ${err.message}`,
                    ),
                );
            }
            resolve(uniqueFileName);
        });
    });
}

export async function deleteSingleFile(path: string, uniqueFileName: string) {
    const filePath = join(path, uniqueFileName);
    return new Promise((resolve, reject) => {
        unlink(filePath, (err) => {
            if (err) {
                return reject(
                    new BadRequestException(
                        `Error al eliminar el archivo: ${err.message}`,
                    ),
                );
            }
            resolve(true);
        });
    });
}

export async function getFilesFromArg(
    filesArg: any,
    optionsArray: FileSaveOptions[],
    callback?,
) {
    const keys = Object.keys(filesArg);
    if (!keys.find((key) => filesArg[key][0]?.buffer))
        return new Error('No se encontraron archivos en la petición');

    const files = [];
    for (const option of optionsArray) {
        const key = keys.find((k) => k === option.fieldName);
        if (key) {
            const file = {
                fieldName: option.fieldName,
                destination: option.destination,
                ...filesArg[key][0],
            };
            if (callback) {
                const resCallback = await callback(file, key);
                file.savedName = resCallback;
            }
            filesArg[key] = file;
            files.push(file);
        }
    }
    return files;
}

export function saveFileNameInDto(
    dto: any,
    fieldName: string,
    savedName: string,
) {
    if (dto && typeof dto === 'object' && !dto[fieldName]) {
        dto[fieldName] = savedName;
    }
}

export function findRepositoryInClass(
    target: any,
    entity: EntityTarget<any>,
): any {
    if (target.repository) return target.repository;
    else if (entity) return AppDataSource.getRepository(entity);
    else throw new Error('No se ha encontrado un repositorio');
}

export function getParams(
    keys: symbol[],
    target: any,
    propertyKey: string,
    args: any[],
) {
    return keys.map((key) => {
        const index = Reflect.getOwnMetadata(key, target, propertyKey);
        if (index === undefined) {
            throw new Error(`No se encontró uno de los parámetros`);
        }
        return args[index];
    });
}
