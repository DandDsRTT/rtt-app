import { initialState } from "./initialState"
import { createReducer } from "@reduxjs/toolkit"

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase("expandDomain", (state, action) => {
            state.standardDomainPrimeCount = state.standardDomainPrimeCount + 1
            state.mapping = state.mapping.map((mappingRow: number[]) => [...mappingRow, 0])
        })
        .addCase("shrinkDomain", (state, action) => {
            state.standardDomainPrimeCount = state.standardDomainPrimeCount - 1
            state.mapping = state.mapping.map((mappingRow: number[]) => mappingRow.slice(0, state.standardDomainPrimeCount))
        })
        .addCase("changeMapping", (state, action) => {
            // @ts-ignore
            state.mapping = action.data
        })
        .addCase("changeCommaBasis", (state, action) => {
            // @ts-ignore
            state.commaBasis = action.data
        })
})

export {
    reducer,
}
