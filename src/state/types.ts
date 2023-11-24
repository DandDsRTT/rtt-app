interface ObjectState {
    dimensionality: number,
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

export {
    ObjectState,
    View,
    Column,
    Row,
    SubColumn,
    SubRow,
}
