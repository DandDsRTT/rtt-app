import React from "react"
import { handleCommaBasisElementChange } from "./handlers"
import { useSelector } from "react-redux"
import { Col, ObjectState, Row, SubCol, SubRow } from "../../state/types"
import { Dispatch } from "@reduxjs/toolkit"
import { includePaddingAndMargin } from "../block/includePaddingAndMargin"
import { blank } from "../block/blank"

const getCommaBasisElements = (row: Row, col: Col, dispatch: Dispatch) => {
    const commaBasis = useSelector((state: ObjectState) => state.commaBasis)

    return includePaddingAndMargin(row, col, getCommaBasisElement, { dispatch, commaBasis })
}

const getCommaBasisElement = (
    subrow: SubRow,
    subcol: SubCol,
    key: string,
    { dispatch, commaBasis }: {
        dispatch: Dispatch,
        commaBasis: number[][]
    },
) => {
    const gridRow = subrow.gridRow
    const gridCol = subcol.gridCol

    if (subrow.name.includes("p_") && subcol.name.includes("c_")) {
        const commaBasisRowIndex = parseInt(subrow.name.replace("p_", "")) - 1
        const commaBasisColIndex = parseInt(subcol.name.replace("c_", "")) - 1
        const commaBasisElement = commaBasis[ commaBasisColIndex ][ commaBasisRowIndex ]

        return (
            <div
                className="square-input"
                style={{
                    gridRow: gridRow,
                    gridColumn: gridCol,
                }}
                key={key}
            >
                <input
                    value={commaBasisElement}
                    onChange={input => handleCommaBasisElementChange(dispatch, commaBasis, input, [commaBasisColIndex, commaBasisRowIndex])}
                />
            </div>
        )
    } else {
        return blank(gridRow, gridCol, key)
    }
}

export {
    getCommaBasisElements,
}
