import React from "react";
import axios from "axios";
import {HOST} from "../../constants";
import {convertCommaBasisToEbk} from "../../utilities";

const handleCommaBasisElementChange = (dispatch, commaBasis, input: React.ChangeEvent<HTMLInputElement>, commaBasisAddress: number[]) => {
    const [ colIndex, rowIndex ] = commaBasisAddress
    const newCommaBasis = JSON.parse(JSON.stringify(commaBasis))
    newCommaBasis[ colIndex ][ rowIndex ] = parseInt(input.target.value)
    dispatch({ type: "changeCommaBasis", data: newCommaBasis })

    axios.get(
        HOST + encodeURI("dual?unparsedT=" + convertCommaBasisToEbk(newCommaBasis)),
        {},
    ).then(response => {
        let unparsedMapping = response.data.replace("MatrixForm[", "")
            .replace("]", "")
            .replaceAll("{", "[")
            .replaceAll("}", "]")
        unparsedMapping = JSON.parse(unparsedMapping)
        dispatch({ type: "changeMapping", data: unparsedMapping })
    }).catch(e => {
        console.error("axios error: ", e)
    })
}

export {
    handleCommaBasisElementChange,
}