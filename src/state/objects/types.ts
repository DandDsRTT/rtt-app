import {Action} from "@reduxjs/toolkit";

interface ObjectsStateWithoutSnapshots {
    dimensionality: number,
    rank: number,
    mapping: number[][],
    commaBasis: number[][],
}

interface ObjectsState extends ObjectsStateWithoutSnapshots {
    snapshots: ObjectsStateWithoutSnapshots[]
}

interface ChangeMappingAction extends Action {
    mapping: number[][],
}

interface ChangeCommaBasisAction extends Action {
    commaBasis: number[][],
}

interface ExpandDomainAction extends Action {
    commaBasis: number[][],
}

interface ShrinkDomainAction extends Action {
    commaBasis: number[][],
}

export {
    ObjectsState,
    ObjectsStateWithoutSnapshots,
    ChangeMappingAction,
    ChangeCommaBasisAction,
    ExpandDomainAction,
    ShrinkDomainAction,
}