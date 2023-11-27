import axios from "axios"
import { HOST } from "../../constants"
import { convertMappingToEbk, transposeArray } from "../../utilities"
import {addLoading, removeLoading} from "../loading";
import {Handler} from "../types";

const handleMappingElementChange: Handler<HTMLInputElement> = (handlerParameters) => {
    const {address, matrix, dispatch, element: input} = handlerParameters
    const [rowIndex, columnIndex] = address
    const newMapping = JSON.parse(JSON.stringify(matrix))
    const newValue = parseInt(input.target.value);
    newMapping[ rowIndex ][ columnIndex ] = isNaN(newValue) ? input.target.value : newValue
    dispatch({ type: "snapshot"})
    dispatch({ type: "changeMapping", mapping: newMapping })
    if (isNaN(newValue)) return

    const loading = addLoading()
    dispatch({type: "loading"})

    axios.get(
        HOST + encodeURI("dual?unparsedT=" + convertMappingToEbk(newMapping)),
        {},
    ).then(response => {
        let unparsedCommaBasis = response.data.replace("MatrixForm[", "")
            .replace("]", "")
            .replaceAll("{", "[")
            .replaceAll("}", "]")
        unparsedCommaBasis = JSON.parse(unparsedCommaBasis)
        unparsedCommaBasis = transposeArray(unparsedCommaBasis)
        dispatch({ type: "changeCommaBasis", commaBasis: unparsedCommaBasis })
        removeLoading(loading)
        dispatch({type: "finishedLoading"})
    }).catch(e => {
        console.error("axios error: ", e)
    })
}

export {
    handleMappingElementChange,
}
