import React from "react"
import { handleMinus, handlePlus } from "../domain/handlers"
import { Col, Row, SubCol, SubRow } from "../../state/types"
import { Dispatch } from "@reduxjs/toolkit"
import { includePaddingAndMargin } from "../block/includePaddingAndMargin"
import { blank } from "../block/blank"

const getDomainRemovesAndExpandsElements = (row: Row, col: Col, dispatch: Dispatch) => {
    return includePaddingAndMargin(row, col, getDomainRemoveOrExpandElement, { dispatch })
}

const getDomainRemoveOrExpandElement = (
    subrow: SubRow,
    subcol: SubCol,
    key: string,
    { dispatch }: {
        dispatch: Dispatch
    },
) => {
    const gridRow = subrow.gridRow
    const gridCol = subcol.gridCol

    if (subrow.name === "text") {
        return blank(gridRow, gridCol, key)
    } else {
        if (subcol.name.slice(0, 2) === "p_") {
            return (
                <div
                    className="square-box"
                    key={key}
                    style={{
                        gridRow: gridRow,
                        gridColumn: gridCol,
                    }}
                >
                    <button
                        onClick={() => handleMinus(dispatch)}
                    >-
                    </button>
                </div>
            )
        } else if (subcol.name === "plus") {
            return (
                <div
                    className="square-box"
                    key={key}
                    style={{
                        gridRow: gridRow,
                        gridColumn: gridCol,
                    }}
                >
                    <button
                        onClick={() => handlePlus(dispatch)}
                    >+
                    </button>
                </div>
            )
        } else {
            return blank(gridRow, gridCol, key)
        }
    }
}

export {
    getDomainRemovesAndExpandsElements,
}
