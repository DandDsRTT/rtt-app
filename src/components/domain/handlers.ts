const handlePlus = (dispatch) => dispatch({ type: "expandDomain" })

const handleMinus = (dispatch) => dispatch({ type: "shrinkDomain" })

export {
    handleMinus,
    handlePlus,
}
