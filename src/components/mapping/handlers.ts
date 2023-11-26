import axios from "axios"
import { HOST } from "../../constants"
import { convertMappingToEbk, transposeArray } from "../../utilities"
import {addLoading, removeLoading} from "../loading";
import {Handler} from "../types";

const handleMappingElementChange: Handler<HTMLInputElement> = (handlerParameters) => {
    const {address, matrix, dispatch, element: input} = handlerParameters
    const [rowIndex, columnIndex] = address
    const newMapping = JSON.parse(JSON.stringify(matrix))
    newMapping[ rowIndex ][ columnIndex ] = parseInt(input.target.value)
    dispatch({ type: "changeMapping", mapping: newMapping })
    
    const loading = addLoading()
    
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
    }).catch(e => {
        console.error("axios error: ", e)
    })
}

export {
    handleMappingElementChange,
}
