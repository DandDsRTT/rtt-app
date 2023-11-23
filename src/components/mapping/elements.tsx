import React from "react"
import { handleMappingElementChange } from "./handlers"
import { useSelector } from "react-redux"
import { Col, ObjectState, Row, SubCol, SubRow } from "../../state/types"
import { Dispatch } from "@reduxjs/toolkit"
import { includePaddingAndMargin } from "../block/includePaddingAndMargin"
import { blank } from "../block/blank"

const getMappingElements = (row: Row, col: Col, dispatch: Dispatch) => {
    const mapping = useSelector((state: ObjectState) => state.mapping)

    return includePaddingAndMargin(row, col, getMappingElement, { dispatch, mapping })
}

// TODO: use the <> </> pattern to improve the readability of this stuff, make it actually a component 

const getMappingElement = (
    subrow: SubRow,
    subcol: SubCol,
    key: string,
    { dispatch, mapping }: {
        dispatch: Dispatch,
        mapping: number[][]
    },
) => {
    const gridRow = subrow.gridRow
    const gridCol = subcol.gridCol

    if (subcol.name.slice(0, 2) === "p_" && subrow.name.slice(0, 2) === "g_") {
        const generatorIndex = parseInt(subrow.name.replace("g_", "")) - 1
        const primeIndex = parseInt(subcol.name.replace("p_", "")) - 1
        const mappingElement = mapping[ generatorIndex ][ primeIndex ]

        return (
            <div
                className="square-input"
                key={key}
                style={{
                    gridRow: gridRow,
                    gridColumn: gridCol,
                }}
            >
                <input
                    value={mappingElement}
                    title={`mapping-cell-row-${generatorIndex+1}-col-${primeIndex+1}`}
                    onChange={input => handleMappingElementChange(dispatch, mapping, input, [generatorIndex, primeIndex])}
                />
            </div>
        )
    } else {
        return blank(gridRow, gridCol, key)
    }
}

export {
    getMappingElements,
}
