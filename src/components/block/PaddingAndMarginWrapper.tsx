import { SubCol } from "../../state/view/types"
import { CornerPadding, HorizontalPadding, VerticalPadding } from "./Padding"
import React from "react"
import { CornerMargin, HorizontalMargin, VerticalMargin } from "./Margin"
import { BlockProps } from "./types";

const PaddingAndMarginWrapper = ({ row, col, Element, dispatch, matrix, loading, ...other }: BlockProps): React.JSX.Element => {
    let elements: React.JSX.Element[] = []
    row.subRows.forEach((subRow, rowKey) => {
        if (subRow.type === "padding") {
            col.subCols.forEach((subCol: SubCol, colKey: number) => {
                let gridRow = subRow.gridRow
                let gridColumn = subCol.gridColumn
                const gridLineHorizontal = subRow.type === "gridded"
                const key = [rowKey, colKey].join(",")
                if (subCol.type === "margin") {
                    elements.push(<HorizontalMargin {...{ gridRow, gridColumn, gridLineHorizontal }} key={key} />)
                } else {
                    if (colKey === 0 || colKey === col.subCols.length - 2) {
                        elements.push(<CornerPadding {...{ gridRow, gridColumn }} key={key} />)
                    } else {
                        elements.push(<VerticalPadding {...{ gridRow, gridColumn }} key={key} />)
                    }
                }
            })
        } else if (subRow.type === "margin") {
            col.subCols.forEach((subCol: SubCol, colKey: number) => {
                const gridRow = subRow.gridRow
                const gridColumn = subCol.gridColumn
                const gridLineVertical = subCol.type === "gridded"
                const key = [rowKey, colKey].join(",")
                if (colKey === col.subCols.length - 1) {
                    elements.push(<CornerMargin {...{ gridRow, gridColumn }} key={key} />)
                } else {
                    elements.push(<VerticalMargin {...{ gridRow, gridColumn, gridLineVertical }} key={key} />)
                }
            })
        } else {
            col.subCols.forEach((subCol: SubCol, colKey: number) => {
                let gridRow = subRow.gridRow
                let gridColumn = subCol.gridColumn
                const key = [rowKey, colKey].join(",")
                const gridLineHorizontal = subRow.type === "gridded"

                if (subCol.type === "padding") {
                    elements.push(<HorizontalPadding {...{ gridRow, gridColumn }} key={key} />)
                } else if (subCol.type === "margin") {
                    elements.push(<HorizontalMargin {...{ gridRow, gridColumn, gridLineHorizontal }} key={key} />)
                } else {
                    if (!Element) throw new Error("No Element.")
                    elements.push(<Element {...{ subRow, subCol, dispatch, matrix, loading, ...other }} key={key} />)
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
