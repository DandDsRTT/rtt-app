import {ObjectsState} from "./types";

const updateCommaBasis = (objectsState: ObjectsState, newCommaBasis: number[][]) => {
    newCommaBasis.forEach((column, columnIndex) => {
        column.forEach((cell, rowIndex) => {
            objectsState.commaBasis[columnIndex] ||= []
            objectsState.commaBasis[columnIndex][rowIndex] = cell
        })
    })
    while (objectsState.commaBasis.length > newCommaBasis.length) objectsState.commaBasis.pop()
    while (objectsState.commaBasis[0].length > newCommaBasis[0].length) objectsState.commaBasis.map(_ => _.pop())
}

const updateMapping = (objectsState: ObjectsState, newMapping: number[][]) => {
    newMapping.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            objectsState.mapping[rowIndex] ||= []
            objectsState.mapping[rowIndex][columnIndex] = cell
        })
    })
    while (objectsState.mapping.length > newMapping.length) objectsState.mapping.pop()
    while (objectsState.mapping[0].length > newMapping[0].length) objectsState.mapping.map(_ => _.pop())
}


const isObject = (item: unknown) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

const mergeDeep = (target: any, ...sources: any[]): any => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

export {
    updateMapping,
    updateCommaBasis,
    mergeDeep,
}