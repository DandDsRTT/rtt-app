import {View} from "./types";

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
}
