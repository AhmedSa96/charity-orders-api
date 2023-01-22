import { ClassConstructor } from "class-transformer";

export function getSelectColumns<T, E>(resourceType: ClassConstructor<T>, entityType: ClassConstructor<E>): string[] {
    const object = new resourceType();
    return Object.keys(object)
        .map(key => `${entityType.name}.${key} AS ${key}`);
}