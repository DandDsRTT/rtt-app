import { View } from "./types";
import { COLS, ROWS } from "../../constants";

const updateDomain = (view: View, dimensionality: number) => {
    view.cols[COLS.DOMAIN_PRIMES].subCols.length = 0
    for (let i = 0; i < dimensionality; i++) {
        view.cols[COLS.DOMAIN_PRIMES].subCols.push({ type: "gridded", index: i, gridColumn: 0 })
    }
    view.cols[COLS.DOMAIN_PRIMES].subCols.push({ type: "name", gridColumn: 0 })
    view.cols[COLS.DOMAIN_PRIMES].subCols.push({ type: "plus", gridColumn: 0 })

    view.rows[ROWS.INTERVALS].subRows.length = 0
    for (let i = 0; i < dimensionality; i++) {
        view.rows[ROWS.INTERVALS].subRows.push({ type: "gridded", index: i, gridRow: 0 })
    }
    view.rows[ROWS.INTERVALS].subRows.push({ type: "name", gridRow: 0 })
    view.rows[ROWS.INTERVALS].subRows.push({ type: "plus", gridRow: 0 })
}

const updateRank = (view: View, rank: number) => {
    view.cols[COLS.GENERATORS].subCols.length = 0
    for (let i = 0; i < rank; i++) {
        view.cols[COLS.GENERATORS].subCols.push({ type: "gridded", index: i, gridColumn: 0 })
    }
    view.cols[COLS.GENERATORS].subCols.push({ type: "name", gridColumn: 0 })
    view.cols[COLS.GENERATORS].subCols.push({ type: "plus", gridColumn: 0 })

    view.rows[ROWS.MAPPING].subRows.length = 0
    for (let i = 0; i < rank; i++) {
        view.rows[ROWS.MAPPING].subRows.push({ type: "gridded", index: i, gridRow: 0 })
    }
    view.rows[ROWS.MAPPING].subRows.push({ type: "name", gridRow: 0 })
    view.rows[ROWS.MAPPING].subRows.push({ type: "plus", gridRow: 0 })
}


const updateGrid = (view: View) => {
    let gridRow = 0
    view.rows.forEach(row => {
        if (row.subRows[0].type !== "padding") {
            row.subRows.unshift({
                type: "padding",
                side: "top",
                gridRow: 0,
            })
            row.subRows.push({
                type: "padding",
                side: "bottom",
                gridRow: 0,
            })
            row.subRows.push({
                type: "margin",
                side: "vertical",
                gridRow: 0,
            })
        }

        row.subRows.forEach(subRow => {
            subRow.gridRow = gridRow
            gridRow++
        })
    })

    let gridColumn = 0
    view.cols.forEach(col => {
        if (col.subCols[0].type !== "padding") {
            col.subCols.unshift({
                type: "padding",
                side: "left",
                gridColumn: 0,
            })
            col.subCols.push({
                type: "padding",
                side: "right",
                gridColumn: 0,
            })
            col.subCols.push({
                type: "margin",
                side: "horizontal",
                gridColumn: 0,
            })
        }

        col.subCols.forEach(subCol => {
            subCol.gridColumn = gridColumn
            gridColumn++
        })
    })

    return view
}

export {
    updateGrid,
    updateRank,
    updateDomain,
}
