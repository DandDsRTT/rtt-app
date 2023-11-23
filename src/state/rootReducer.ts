import { initialState } from "./initialState"
import { Action, createReducer } from "@reduxjs/toolkit"
import { COLS, ROWS } from "../constants"
import { View } from "./types"

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
        .addCase("changeMapping", (state, action: Action<"changeMapping">) => {
            // @ts-ignore
            state.mapping = action.data
        })
        .addCase("changeCommaBasis", (state, action) => {
            // @ts-ignore
            state.commaBasis = action.data
        })
        .addCase("initializeGrid", (state) => {
           updateGrid(state.view)
        })
})

const updateDomain = (view: View, dimensionality: number) => {
    const newSubcols = []
    for (let i = 1; i <= dimensionality; i++) {
        newSubcols.push({ name: `p_${i}`, gridCol: 0 })
    }
    newSubcols.push({ name: "plus", gridCol: 0})
    view.cols[ COLS.DOMAIN_PRIMES ].subcols = newSubcols
    
    const newSubrows = []
    for (let i = 1; i <= dimensionality; i++) {
        newSubrows.push({ name: `p_${i}`, gridRow: 0 })
    }
    newSubrows.push({ name: "plus", gridRow: 0})
    view.rows[ ROWS.INTERVALS ].subrows = newSubrows
}

const updateGrid = (view: View) => {
    let gridRow = 0
    view.rows.forEach(row => {
        if (row.subrows[0].name !== "top padding") {
            row.subrows.unshift({
                name: "top padding",
                gridRow: 0,
            })
            row.subrows.push({
                name: "bottom padding",
                gridRow: 0,
            })
            row.subrows.push({
                name: "vertical margin",
                gridRow: 0,
            })
        }

        row.subrows.forEach(subrow => {
            subrow.gridRow = gridRow
            gridRow++
        })
    })

    let gridCol = 0
    view.cols.forEach(col => {
        if (col.subcols[0].name !== "left padding") {
            col.subcols.unshift({
                name: "left padding",
                gridCol: 0,
            })
            col.subcols.push({
                name: "right padding",
                gridCol: 0,
            })
            col.subcols.push({
                name: "horizontal margin",
                gridCol: 0,
            })
        }

        col.subcols.forEach(subcol => {
            subcol.gridCol = gridCol
            gridCol++
        })
    })

    // console.log(current(view))

    return view
}

export {
    reducer,
}
