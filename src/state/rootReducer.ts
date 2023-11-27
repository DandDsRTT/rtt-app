import {initialState} from "./initialState"
import {createReducer, current} from "@reduxjs/toolkit"
import {
    ChangeCommaBasisAction,
    ChangeMappingAction,
    ExpandDomainAction,
    ShrinkDomainAction,
} from "./types"
import {mergeDeep} from "./helpers";
import {updateGrid} from "./view";
import {updateCommaBasis, updateDomain, updateMapping, updateRank} from "./components";

// TODO: break up reducer by view, settings, user data, etc; use constants for actions

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase("expandDomain", (state, action: ExpandDomainAction) => {
            state.dimensionality = state.dimensionality + 1
            state.rank = state.rank + 1
            updateCommaBasis(state, action.commaBasis)
            updateDomain(state.view, state.dimensionality)
            updateRank(state.view, state.rank)
            updateGrid(state.view)
        })
        .addCase("shrinkDomain", (state, action: ShrinkDomainAction) => {
            state.dimensionality = state.dimensionality - 1
            state.rank = state.rank - 1
            updateCommaBasis(state, action.commaBasis)
            updateDomain(state.view, state.dimensionality)
            updateRank(state.view, state.rank)
            updateGrid(state.view)
        })
        .addCase("changeMapping", (state, action: ChangeMappingAction) => {
            updateMapping(state, action.mapping)
            updateDomain(state.view, state.dimensionality)
            updateRank(state.view, state.rank)
            updateGrid(state.view)
        })
        .addCase("changeCommaBasis", (state, action: ChangeCommaBasisAction) => {
            updateCommaBasis(state, action.commaBasis)
            updateDomain(state.view, state.dimensionality)
            updateRank(state.view, state.rank)
            updateGrid(state.view)
        })
        .addCase("initializeGrid", (state) => {
            updateGrid(state.view)
        })
        .addCase("snapshot", (state) => {
            const {snapshots, ...toBeSnapshot} = state
            state.snapshots.push(toBeSnapshot)
        })
        .addCase("undo", (state) => {
            const mostRecentSnapshot = state.snapshots.pop()
            mergeDeep(state, JSON.parse(JSON.stringify(current(mostRecentSnapshot))))
            updateGrid(state.view)
        })
        .addCase("loading", (state) => {
            state.loading = true
        })
        .addCase("finishedLoading", (state) => {
            state.loading = false
        })
})

export {
    reducer,
}
