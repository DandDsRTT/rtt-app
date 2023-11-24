import {SubCol} from "../../state/types"
import {cornerPadding, horizontalPadding, verticalPadding} from "./padding"
import React from "react"
import {cornerMargin, horizontalMargin, verticalMargin} from "./margin"
import {BlockProps} from "./types";

const PaddingAndMarginWrapper = ({row, col, elementFunction, dispatch, matrix}: BlockProps): React.JSX.Element => {
    let elements: React.JSX.Element[] = []
    row.subrows.forEach((subrow, rowKey) => {
        if (subrow.name.includes("padding")) {
            col.subcols.forEach((subcol: SubCol, colKey: number) => {
                let gridRow = subrow.gridRow
                let gridCo = subcol.gridCol
                const key = [rowKey, colKey].join(",")
                if (subcol.name.includes("margin")) {
                    elements.push(horizontalMargin(gridRow, gridCo, key))
                } else {
                    if (colKey === 0 || colKey === col.subcols.length - 2) {
                        elements.push(cornerPadding(gridRow, gridCo, key))
                    } else {
                        elements.push(verticalPadding(gridRow, gridCo, key))
                    }
                }
            })
        } else if (subrow.name.includes("margin")) {
            col.subcols.forEach((subcol: SubCol, colKey: number) => {
                let gridRow = subrow.gridRow
                let gridCo = subcol.gridCol
                const key = [rowKey, colKey].join(",")
                if (colKey === col.subcols.length - 1) {
                    elements.push(cornerMargin(gridRow, gridCo, key))
                } else {
                    elements.push(verticalMargin(gridRow, gridCo, key))
                }
            })
        } else {
            col.subcols.forEach((subcol: SubCol, colKey: number) => {
                let gridRow = subrow.gridRow
                let gridCo = subcol.gridCol
                const key = [rowKey, colKey].join(",")

                if (subcol.name.includes("padding")) {
                    elements.push(horizontalPadding(gridRow, gridCo, key))
                } else if (subcol.name.includes("margin")) {
                    elements.push(horizontalMargin(gridRow, gridCo, key))
                } else {
                    elements.push(elementFunction({subrow, subcol, key, dispatch, matrix}))
                }
            })
        }
    })

    return (
        <>
            {elements}
        </>
    )
}

export {
    PaddingAndMarginWrapper,
}
