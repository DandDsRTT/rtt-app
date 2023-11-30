import {Dispatch} from "@reduxjs/toolkit";
import {store} from "../../state/store";

const handleUndo = (dispatch: Dispatch) => {
    dispatch({type: "undo"})
    const {objects: {rank, dimensionality}} = store.getState()
    dispatch({type: "updateView", rank, dimensionality})
}

export {
    handleUndo,
}
