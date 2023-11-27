import axios from "axios"
import {HOST} from "../../constants"
import {convertCommaBasisToEbk} from "../../utilities"
import {HandlerParameters, Handler} from "../types";
import {addLoading, removeLoading} from "../loading";

const handleCommaBasisCellChange: Handler<HTMLInputElement> = (handlerParameters: HandlerParameters<any>) => {
    const {address, matrix, element: input, dispatch} = handlerParameters
    const [columnIndex, rowIndex] = address
    const newCommaBasis = JSON.parse(JSON.stringify(matrix))

    const newValue = parseInt(input.target.value);
    newCommaBasis[columnIndex][rowIndex] = isNaN(newValue) ? input.target.value : newValue
    dispatch({ type: "snapshot"})
    dispatch({type: "changeCommaBasis", commaBasis: newCommaBasis})
    if (isNaN(newValue)) return
    const loading = addLoading()

    axios.get(
        HOST + encodeURI("dual?unparsedT=" + convertCommaBasisToEbk(newCommaBasis)),
        {},
    ).then(response => {
        let unparsedMapping = response.data.replace("MatrixForm[", "")
            .replace("]", "")
            .replaceAll("{", "[")
            .replaceAll("}", "]")
        unparsedMapping = JSON.parse(unparsedMapping)
        dispatch({type: "changeMapping", mapping: unparsedMapping})
        removeLoading(loading)
    }).catch(e => {
        console.error("axios error: ", e)
    })
}

export {
    handleCommaBasisCellChange,
}
