import axios from "axios";
import {HOST} from "../../constants";
import {convertCommaBasisToEbk} from "../../utilities";
import {DomainHandler} from "./types";
import {addLoading, removeLoading} from "../loading";

const handlePlus: DomainHandler = (domainHandlerParameters) => {
    const {matrix, dispatch} = domainHandlerParameters
    const newCommaBasis = matrix.map((comma: number[]) => [...comma, 0])

    dispatch({ type: "snapshot"})
    dispatch({ type: "expandDomain", commaBasis: newCommaBasis })

    const loading = addLoading()
    dispatch({type: "loading"})

    axios.get(
        HOST + encodeURI("dual?unparsedT=" + convertCommaBasisToEbk(newCommaBasis)),
        {},
    ).then(response => {
        let unparsedMapping = response.data.replace("MatrixForm[", "")
            .replace("]", "")
            .replaceAll("{", "[")
            .replaceAll("}", "]")
        unparsedMapping = JSON.parse(unparsedMapping)
        dispatch({ type: "changeMapping", mapping: unparsedMapping })
        removeLoading(loading)
        dispatch({type: "finishedLoading"})
    }).catch(e => {
        console.error("axios error: ", e)
    })
}

const handleMinus: DomainHandler = (domainHandlerParameters) => {
    const {matrix, dispatch, dimensionality} = domainHandlerParameters
    if (!dimensionality) throw new Error("No dimensionality.")
    const newCommaBasis = matrix.map((comma: number[]) => comma.slice(0, dimensionality - 1))
  
    dispatch({ type: "snapshot"})
    dispatch({ type: "shrinkDomain", commaBasis: newCommaBasis })
    
    const loading = addLoading()
    dispatch({type: "loading"})

    axios.get(
        HOST + encodeURI("dual?unparsedT=" + convertCommaBasisToEbk(newCommaBasis)),
        {},
    ).then(response => {
        let unparsedMapping = response.data.replace("MatrixForm[", "")
            .replace("]", "")
            .replaceAll("{", "[")
            .replaceAll("}", "]")
        unparsedMapping = JSON.parse(unparsedMapping)
        dispatch({ type: "changeMapping", mapping: unparsedMapping })
        removeLoading(loading)
        dispatch({type: "finishedLoading"})
    }).catch(e => {
        console.error("axios error: ", e)
    })
}

export {
    handleMinus,
    handlePlus,
}
