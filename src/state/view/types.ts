import { Action } from "@reduxjs/toolkit";

interface ViewState {
    view: View,
    loading: boolean,
}

interface View {
    rows: Row[],
    cols: Col[],
}

interface Row {
    name: string,
    viewState: string,
    subRows: SubRow[],
}

interface Col {
    name: string,
    viewState: string,
    subCols: SubCol[],
}

interface SubRow {
    type: string,
    index?: number,
    side?: string,
    gridRow: number,
}

interface SubCol {
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
    Col,
    Row,
    SubCol,
    SubRow,
    UpdateViewAction,
}
