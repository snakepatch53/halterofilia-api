export const FILES_METADATA_KEY = Symbol('ID_ARG_METADATA_KEY');
export const DTO_METADATA_KEY = Symbol('ID_ARG_METADATA_KEY');
export const ID_METADATA_KEY = Symbol('ID_PARAM_METADATA_KEY');

export function FilesArg() {
    return (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number,
    ) =>
        Reflect.defineMetadata(
            FILES_METADATA_KEY,
            parameterIndex,
            target,
            propertyKey,
        );
}

export function DtoArg() {
    return (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number,
    ) =>
        Reflect.defineMetadata(
            DTO_METADATA_KEY,
            parameterIndex,
            target,
            propertyKey,
        );
}

export function IdArg() {
    return (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number,
    ) =>
        Reflect.defineMetadata(
            ID_METADATA_KEY,
            parameterIndex,
            target,
            propertyKey,
        );
}
