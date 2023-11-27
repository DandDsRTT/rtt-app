import {Action} from "@reduxjs/toolkit";

interface ObjectState extends ObjectStateWithoutSnapshots {
    snapshots: ObjectStateWithoutSnapshots[]
}

interface ObjectStateWithoutSnapshots {
    dimensionality: number,
    rank: number,
    mapping: number[][],
    commaBasis: number[][],
    view: View,
}

interface View {
    rows: Row[],
    cols: Column[],
}

interface Row {
    name: string,
    viewState: string,
    subRows: SubRow[],
}

interface Column {
    name: string,
    viewState: string,
    subColumns: SubColumn[],
}

interface SubRow {
    type: string,
    index?: number,
    side?: string,
    gridRow: number,
}

interface SubColumn {
    type: string,
    index?: number,
    side?: string,
    gridColumn: number,
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
    ObjectState,
    ObjectStateWithoutSnapshots,
    View,
    Column,
    Row,
    SubColumn,
    SubRow,
    ChangeMappingAction,
    ChangeCommaBasisAction,
    ExpandDomainAction,
    ShrinkDomainAction,
}
