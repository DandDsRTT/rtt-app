import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios";
import {HOST} from "../../constants";
import {convertCommaBasisToEbk} from "../../utilities";

const handlePlus = (dispatch: Dispatch, commaBasis: number[][]) => {
    const newCommaBasis = commaBasis.map((comma: number[]) => [...comma, 0])
    dispatch({ type: "expandDomain", commaBasis: newCommaBasis })

    const loadingDiv = document.createElement("div");
    loadingDiv.innerText = "loading..."
    document.body.appendChild(loadingDiv)
    
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
        document.body.removeChild(loadingDiv)
    }).catch(e => {
        console.error("axios error: ", e)
    })
}

const handleMinus = (dispatch: Dispatch, commaBasis: number[][], dimensionality: number) => {
    const newCommaBasis = commaBasis.map((comma: number[]) => comma.slice(0, dimensionality - 1))
    dispatch({ type: "shrinkDomain", commaBasis: newCommaBasis })
    
    const loadingDiv = document.createElement("div");
    loadingDiv.innerText = "loading..."
    document.body.appendChild(loadingDiv)

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
        document.body.removeChild(loadingDiv)
    }).catch(e => {
        console.error("axios error: ", e)
    }) // TODO: probably need to DRY a lot of stuff up next
}

export {
    handleMinus,
    handlePlus,
}
