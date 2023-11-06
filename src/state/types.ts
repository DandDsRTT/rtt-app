interface ObjectState {
    dimensionality: number,
    mapping: number[][],
    commaBasis: number[][],
    view: View,
}

interface View {
    rows: Row[],
    cols: Col[],
}

interface Row {
    name: string,
    viewState: string,
    subrows: SubRow[],
}

interface Col {
    name: string,
    viewState: string,
    subcols: SubCol[],
}

interface SubRow {
    name: string,
    gridRow: number,
}

interface SubCol {
    name: string,
    gridCol: number,
}

export {
    ObjectState,
    View,
    Col,
    Row,
    SubCol,
    SubRow,
}
