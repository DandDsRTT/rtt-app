import {createReducer} from "@reduxjs/toolkit"
import {updateDomain, updateGrid, updateRank} from "./helpers";
import {initialViewState} from "./initialState";
import {UpdateViewAction} from "./types";

const viewReducer = createReducer(initialViewState, (builder) => {
    builder
        .addCase("updateView", (viewState, action: UpdateViewAction) => {
            updateDomain(viewState.view, action.dimensionality)
            updateRank(viewState.view, action.rank)
            updateGrid(viewState.view)
        })
        .addCase("initializeGrid", (viewState) => {
            updateGrid(viewState.view)
        })
        .addCase("loading", (viewState) => {
            viewState.loading = true
        })
        .addCase("finishedLoading", (viewState) => {
            viewState.loading = false
        })
})

export {
    viewReducer,
}
