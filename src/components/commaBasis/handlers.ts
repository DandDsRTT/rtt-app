import React from "react"
import axios from "axios"
import { HOST } from "../../constants"
import { convertCommaBasisToEbk } from "../../utilities"
import { Dispatch } from "@reduxjs/toolkit"

const handleCommaBasisElementChange = (dispatch: Dispatch, commaBasis: number[][], input: React.ChangeEvent<HTMLInputElement>, commaBasisAddress: number[]) => {
    const [colIndex, rowIndex] = commaBasisAddress
    const newCommaBasis = JSON.parse(JSON.stringify(commaBasis))
    newCommaBasis[ colIndex ][ rowIndex ] = parseInt(input.target.value)
    dispatch({ type: "changeCommaBasis", commaBasis: newCommaBasis })

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
    }).catch(e => {
        console.error("axios error: ", e)
    })
}

export {
    handleCommaBasisElementChange,
}
