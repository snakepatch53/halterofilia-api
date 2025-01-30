import { EntitySchema, getMetadataArgsStorage } from 'typeorm';

export function getEntityRelations(
    entity: Function | EntitySchema<any>,
): string[] {
    return getMetadataArgsStorage()
        .relations.filter((relation) => relation.target === entity)
        .map((relation) => relation.propertyName);
}
