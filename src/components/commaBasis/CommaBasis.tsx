import React from "react";
import {handleCommaBasisElementChange} from "./handlers";
import {useSelector} from "react-redux";
import {Col, ObjectState, Row} from "../../state/types";
import {Dispatch} from "@reduxjs/toolkit";

const getCommaBasisElements = (row: Row, col: Col, dispatch: Dispatch) => {
    const commaBasis = useSelector((state: ObjectState) => state.commaBasis)

    const commaBasisElements = []
    commaBasis.forEach((comma, colIndex) => {
        comma.forEach((commaElement, rowIndex) => {
            commaBasisElements.push(
                <div
                    className="square-input"
                    style={{
                        gridRow: row.subrows[rowIndex].gridRow,
                        gridColumn: col.subcols[colIndex].gridCol
                    }}
                    key={[colIndex, rowIndex].join(",")}
                >
                    <input
                        value={commaElement}
                        onChange={input => handleCommaBasisElementChange(dispatch, commaBasis, input, [colIndex, rowIndex])}
                    />
                </div>
            )
        })
    })
    
    return commaBasisElements
}

export {
    getCommaBasisElements,
}