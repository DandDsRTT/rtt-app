import {Dispatch} from "@reduxjs/toolkit";

const handleUndo = (dispatch: Dispatch) => {
    dispatch({ type: "undo" })
}

export {
    handleUndo,
}
