import {SubColumn} from "../../state/types"
import {CornerPadding, HorizontalPadding, VerticalPadding} from "./Padding"
import React from "react"
import {CornerMargin, HorizontalMargin, VerticalMargin} from "./Margin"
import {BlockProps} from "./types";

const PaddingAndMarginWrapper = ({row, column, Element, dispatch, matrix, loading, ...other}: BlockProps): React.JSX.Element => {
    let elements: React.JSX.Element[] = []
    row.subRows.forEach((subRow, rowKey) => {
        if (subRow.type === "padding") {
            column.subColumns.forEach((subColumn: SubColumn, colKey: number) => {
                let gridRow = subRow.gridRow
                let gridColumn = subColumn.gridColumn
                const gridLineHorizontal = subRow.type === "gridded"
                const key = [rowKey, colKey].join(",")
                if (subColumn.type === "margin") {
                    elements.push(<HorizontalMargin {...{gridRow, gridColumn, gridLineHorizontal}} key={key}/>)
                } else {
                    if (colKey === 0 || colKey === column.subColumns.length - 2) {
                        elements.push(<CornerPadding {...{gridRow, gridColumn}} key={key}/>)
                    } else {
                        elements.push(<VerticalPadding {...{gridRow, gridColumn}} key={key}/>)
                    }
                }
            })
        } else if (subRow.type === "margin") {
            column.subColumns.forEach((subColumn: SubColumn, colKey: number) => {
                const gridRow = subRow.gridRow
                const gridColumn = subColumn.gridColumn
                const gridLineVertical = subColumn.type === "gridded"
                const key = [rowKey, colKey].join(",")
                if (colKey === column.subColumns.length - 1) {
                    elements.push(<CornerMargin {...{gridRow, gridColumn}} key={key}/>)
                } else {
                    elements.push(<VerticalMargin {...{gridRow, gridColumn, gridLineVertical}} key={key}/>)
                }
            })
        } else {
            column.subColumns.forEach((subColumn: SubColumn, colKey: number) => {
                let gridRow = subRow.gridRow
                let gridColumn = subColumn.gridColumn
                const key = [rowKey, colKey].join(",")
                const gridLineHorizontal = subRow.type === "gridded"

                if (subColumn.type === "padding") {
                    elements.push(<HorizontalPadding {...{gridRow, gridColumn}} key={key}/>)
                } else if (subColumn.type === "margin") {
                    elements.push(<HorizontalMargin {...{gridRow, gridColumn, gridLineHorizontal}} key={key}/>)
                } else {
                    if (!Element) throw new Error("No Element.")
                    elements.push(<Element {...{subRow, subColumn, dispatch, matrix, loading, ...other}} key={key}/>)
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
