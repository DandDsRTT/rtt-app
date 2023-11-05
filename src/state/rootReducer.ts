import { initialState } from "./initialState"
import {Action, createReducer, current} from "@reduxjs/toolkit"
import {COLS, ROWS} from "../constants";

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase("expandDomain", (state) => {
            state.dimensionality = state.dimensionality + 1
            state.mapping = state.mapping.map((mappingRow: number[]) => [...mappingRow, 0])
            // console.log("commaBasis", current(state.commaBasis))
            state.commaBasis = state.commaBasis.map((comma: number[]) => [...comma, 0])
            state.view.cols[COLS.DOMAIN_PRIMES].subcols.push({ name: `p${state.dimensionality}`, gridCol: 0 })
            state.view.rows[ROWS.INTERVALS].subrows.push({ name: `p${state.dimensionality}`, gridRow: 0 })
            state.view = updateGrid(state.view)
        })
        .addCase("shrinkDomain", (state) => {
            state.dimensionality = state.dimensionality - 1
            state.mapping = state.mapping.map((mappingRow: number[]) => mappingRow.slice(0, state.dimensionality))
            state.commaBasis = state.commaBasis.map((comma: number[]) => comma.slice(0, state.dimensionality))
            state.view.cols[COLS.DOMAIN_PRIMES].subcols.pop()
            state.view.rows[ROWS.INTERVALS].subrows.pop()
            state.view = updateGrid(state.view)
        })
        .addCase("changeMapping", (state, action: Action<"changeMapping">) => {
            state.mapping = action.data
        })
        .addCase("changeCommaBasis", (state, action) => {
            state.commaBasis = action.data
        })
        .addCase("initializeGrid", (state) => {
            state.view = updateGrid(state.view)
        })
})

const updateGrid = (view) => {
    let gridRow = 0

    view.rows.forEach(row => {
        // console.log("wtf is row", row)
        row.subrows.forEach(subrow => {
            // console.log("wtf is subrow", subrow)
            subrow.gridRow = gridRow
            gridRow++
        })
    })

    let gridCol = 0
    for (const col of view.cols) {
        for (const subcol of col.subcols) {
            subcol.gridCol = gridCol
            gridCol++
        }
    }
    
    return view
}

export {
    reducer,
}
