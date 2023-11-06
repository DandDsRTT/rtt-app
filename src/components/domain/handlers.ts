import { Dispatch } from "@reduxjs/toolkit"

const handlePlus = (dispatch: Dispatch) => dispatch({ type: "expandDomain" })

const handleMinus = (dispatch: Dispatch) => dispatch({ type: "shrinkDomain" })

export {
    handleMinus,
    handlePlus,
}
