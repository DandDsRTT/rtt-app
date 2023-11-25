import React from "react"
import axios from "axios"
import { HOST } from "../../constants"
import { convertMappingToEbk, transposeArray } from "../../utilities"
import { Dispatch } from "@reduxjs/toolkit"
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const handleMappingElementChange = (dispatch: Dispatch, mapping: number[][], input: React.ChangeEvent<HTMLInputElement>, mappingAddress: number[]) => {
    const [rowIndex, colIndex] = mappingAddress
    const newMapping = JSON.parse(JSON.stringify(mapping))
    newMapping[ rowIndex ][ colIndex ] = parseInt(input.target.value)
    dispatch({ type: "changeMapping", mapping: newMapping })
    
    const loadingDiv = document.createElement("div");
    loadingDiv.innerText = "loading..."
    document.body.appendChild(loadingDiv)
    
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
        document.body.removeChild(loadingDiv)
    }).catch(e => {
        console.error("axios error: ", e)
    })
}

export {
    handleMappingElementChange,
}
