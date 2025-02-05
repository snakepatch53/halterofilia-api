import { EntitySchema, getMetadataArgsStorage } from 'typeorm';

export function getEntityRelations(
    entity: Function | EntitySchema<any>,
    includeSubRelations = false,
    relationParent?: string,
    oldEntities: string[] = [],
): string[] {
    if (!includeSubRelations) {
        return getMetadataArgsStorage()
            .relations.filter((relation) => relation.target === entity)
            .map((relation) => relation.propertyName);
    }
    const newRelations = [];
    if (typeof entity !== 'function' || oldEntities.includes(entity.name))
        return [];
    const newOldEntities = [...oldEntities, entity.name];

    const relations = getMetadataArgsStorage().relations;

    const relationNames = relations.filter(
        (relation) => relation.target === entity,
    ); // de aqui obtengo todas las relaciones de la entidad, nos basaremos en el propertyName
    // console.log(relationNames);

    const relationClases = relations
        .map((relation) => {
            const relationName = relationNames.find((r) => {
                if (
                    typeof relation.target !== 'function' ||
                    typeof r.target !== 'function'
                )
                    return;
                if (
                    !r.propertyName
                        .toLowerCase()
                        .includes(relation.target.name.toLowerCase()) &&
                    !relation.target.name
                        .toLowerCase()
                        .includes(r.propertyName.toLowerCase())
                )
                    return;
                if (
                    !r.target.name
                        .toLowerCase()
                        .includes(relation.propertyName.toLowerCase()) &&
                    !relation.propertyName
                        .toLowerCase()
                        .includes(r.target.name.toLowerCase())
                )
                    return;
                return r;
            });
            // console.log(relationName);

            if (relationName)
                return {
                    ...relation,
                    target: relation.target as Function,
                    _propertyName: relationName.propertyName,
                };
        })
        .filter((relation) => relation);
    // console.log(relationClases);

    for (const relation of relationClases) {
        if (oldEntities.includes(relation.target.name)) continue;
        const newRelation = `${relationParent ? `${relationParent}.` : ''}${
            relation._propertyName
        }`;
        newRelations.push(newRelation);
        const subRelations = getEntityRelations(
            relation.target,
            true,
            newRelation,
            newOldEntities,
        );
        newRelations.push(...subRelations);
    }
    return newRelations;
}
