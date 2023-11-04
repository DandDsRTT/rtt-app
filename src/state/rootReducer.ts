import { initialState } from "./initialState"
import {Action, createReducer} from "@reduxjs/toolkit"

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase("expandDomain", (state) => {
            state.dimensionality = state.dimensionality + 1
            state.mapping = state.mapping.map((mappingRow: number[]) => [...mappingRow, 0])
        })
        .addCase("shrinkDomain", (state) => {
            state.dimensionality = state.dimensionality - 1
            state.mapping = state.mapping.map((mappingRow: number[]) => mappingRow.slice(0, state.dimensionality))
        })
        .addCase("changeMapping", (state, action: Action<"changeMapping">) => {
            state.mapping = action.data
        })
        .addCase("changeCommaBasis", (state, action) => {
            state.commaBasis = action.data
        })
})

export {
    reducer,
}
