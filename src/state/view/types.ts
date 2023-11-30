import {Action} from "@reduxjs/toolkit";

interface ViewState {
    view: View,
    loading: boolean,
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

interface UpdateViewAction extends Action {
    rank: number,
    dimensionality: number,
}

export {
    ViewState,
    View,
    Column,
    Row,
    SubColumn,
    SubRow,
    UpdateViewAction,
}
