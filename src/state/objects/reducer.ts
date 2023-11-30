import {createReducer, current} from "@reduxjs/toolkit"
import {
    ChangeCommaBasisAction,
    ChangeMappingAction,
    ExpandDomainAction,
    ShrinkDomainAction,
} from "./types"
import {updateCommaBasis, updateMapping} from "./helpers";
import {initialObjectsState} from "./initialState";
import {mergeDeep} from "./helpers";

const objectsReducer = createReducer(initialObjectsState, (builder) => {
    builder
        .addCase("snapshot", (objectsState) => {
            const {snapshots, ...toBeSnapshot} = objectsState
            objectsState.snapshots.push(toBeSnapshot)
        })
        .addCase("undo", (objectsState) => {
            const mostRecentSnapshot = objectsState.snapshots.pop()
            mergeDeep(objectsState, JSON.parse(JSON.stringify(current(mostRecentSnapshot))))
            // dispatch({ type: "updateView"})
        })
        .addCase("expandDomain", (objectsState, action: ExpandDomainAction) => {
            objectsState.dimensionality = objectsState.dimensionality + 1
            objectsState.rank = objectsState.rank + 1
            updateCommaBasis(objectsState, action.commaBasis)
        })
        .addCase("shrinkDomain", (objectsState, action: ShrinkDomainAction) => {
            objectsState.dimensionality = objectsState.dimensionality - 1
            objectsState.rank = objectsState.rank - 1
            updateCommaBasis(objectsState, action.commaBasis)
        })
        .addCase("changeMapping", (objectsState, action: ChangeMappingAction) => {
            updateMapping(objectsState, action.mapping)
        })
        .addCase("changeCommaBasis", (objectsState, action: ChangeCommaBasisAction) => {
            updateCommaBasis(objectsState, action.commaBasis)
        })
})

export {
    objectsReducer,
}
