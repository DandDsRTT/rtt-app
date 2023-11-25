import {initialState} from "./initialState"
import {Action, createReducer} from "@reduxjs/toolkit"
import {COLS, ROWS} from "../constants"
import {ChangeCommaBasisAction, ChangeMappingAction, View} from "./types"

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase("expandDomain", (state) => {
            state.dimensionality = state.dimensionality + 1
            state.mapping = state.mapping.map((mappingRow: number[]) => [...mappingRow, 0])
            state.commaBasis = state.commaBasis.map((comma: number[]) => [...comma, 0])
            updateDomain(state.view, state.dimensionality)
            updateGrid(state.view)
        })
        .addCase("shrinkDomain", (state) => {
            state.dimensionality = state.dimensionality - 1
            state.mapping = state.mapping.map((mappingRow: number[]) => mappingRow.slice(0, state.dimensionality))
            state.commaBasis = state.commaBasis.map((comma: number[]) => comma.slice(0, state.dimensionality))
            updateDomain(state.view, state.dimensionality)
            updateGrid(state.view)
        })
        .addCase("changeMapping", (state, action: ChangeMappingAction) => {
            state.mapping = action.mapping
        })
        .addCase("changeCommaBasis", (state, action: ChangeCommaBasisAction) => {
            state.commaBasis = action.commaBasis
        })
        .addCase("initializeGrid", (state) => {
            updateGrid(state.view)
        })
})

const updateDomain = (view: View, dimensionality: number) => {
    const newSubcols = []
    for (let i = 0; i < dimensionality; i++) {
        newSubcols.push({type: "gridded", index: i, gridColumn: 0})
    }
    newSubcols.push({type: "plus", gridColumn: 0})
    view.cols[COLS.DOMAIN_PRIMES].subColumns = newSubcols

    const newSubrows = []
    for (let i = 0; i < dimensionality; i++) {
        newSubrows.push({type: "gridded", index: i, gridRow: 0})
    }
    newSubrows.push({type: "plus", gridRow: 0})
    view.rows[ROWS.INTERVALS].subRows = newSubrows
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
        if (col.subColumns[0].type !== "padding") {
            col.subColumns.unshift({
                type: "padding",
                side: "left",
                gridColumn: 0,
            })
            col.subColumns.push({
                type: "padding",
                side: "right",
                gridColumn: 0,
            })
            col.subColumns.push({
                type: "margin",
                side: "horizontal",
                gridColumn: 0,
            })
        }

        col.subColumns.forEach(subColumn => {
            subColumn.gridColumn = gridColumn
            gridColumn++
        })
    })
    
    return view
}

export {
    reducer,
}
