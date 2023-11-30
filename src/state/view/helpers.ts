import {View} from "./types";
import {COLS, ROWS} from "../../constants";

const updateDomain = (view: View, dimensionality: number) => {
    view.cols[COLS.DOMAIN_PRIMES].subColumns.length = 0
    for (let i = 0; i < dimensionality; i++) {
        view.cols[COLS.DOMAIN_PRIMES].subColumns.push({type: "gridded", index: i, gridColumn: 0})
    }
    view.cols[COLS.DOMAIN_PRIMES].subColumns.push({type: "name", gridColumn: 0})
    view.cols[COLS.DOMAIN_PRIMES].subColumns.push({type: "plus", gridColumn: 0})

    view.rows[ROWS.INTERVALS].subRows.length = 0
    for (let i = 0; i < dimensionality; i++) {
        view.rows[ROWS.INTERVALS].subRows.push({type: "gridded", index: i, gridRow: 0})
    }
    view.rows[ROWS.INTERVALS].subRows.push({type: "name", gridRow: 0})
    view.rows[ROWS.INTERVALS].subRows.push({type: "plus", gridRow: 0})
}

// TODO: refactor state so there's just the minimal representation of tuning and temperament state, 
//  and the view state is completely separate and generated as a result of that, 
//  and then the components read the view state and make it into the interactive app
//  and perhaps the animating in of new components could be handled along with previewing new items that will appear 
//  if you click a button or change a field / highlighting things that are going to change

const updateRank = (view: View, rank: number) => {
    view.cols[COLS.GENERATORS].subColumns.length = 0
    for (let i = 0; i < rank; i++) {
        view.cols[COLS.GENERATORS].subColumns.push({type: "gridded", index: i, gridColumn: 0})
    }
    view.cols[COLS.GENERATORS].subColumns.push({type: "name", gridColumn: 0})
    view.cols[COLS.GENERATORS].subColumns.push({type: "plus", gridColumn: 0})

    view.rows[ROWS.MAPPING].subRows.length = 0
    for (let i = 0; i < rank; i++) {
        view.rows[ROWS.MAPPING].subRows.push({type: "gridded", index: i, gridRow: 0})
    }
    view.rows[ROWS.MAPPING].subRows.push({type: "name", gridRow: 0})
    view.rows[ROWS.MAPPING].subRows.push({type: "plus", gridRow: 0})
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
    view.cols.forEach(column => {
        if (column.subColumns[0].type !== "padding") {
            column.subColumns.unshift({
                type: "padding",
                side: "left",
                gridColumn: 0,
            })
            column.subColumns.push({
                type: "padding",
                side: "right",
                gridColumn: 0,
            })
            column.subColumns.push({
                type: "margin",
                side: "horizontal",
                gridColumn: 0,
            })
        }

        column.subColumns.forEach(subColumn => {
            subColumn.gridColumn = gridColumn
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
