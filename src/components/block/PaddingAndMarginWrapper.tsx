import {SubColumn} from "../../state/types"
import {CornerPadding, HorizontalPadding, VerticalPadding} from "./Padding"
import React from "react"
import {CornerMargin, HorizontalMargin, VerticalMargin} from "./Margin"
import {BlockProps} from "./types";

const PaddingAndMarginWrapper = ({row, col, Element, dispatch, matrix}: BlockProps): React.JSX.Element => {
    let elements: React.JSX.Element[] = []
    row.subRows.forEach((subRow, rowKey) => {
        if (subRow.type === "padding") {
            col.subColumns.forEach((subColumn: SubColumn, colKey: number) => {
                let gridRow = subRow.gridRow
                let gridColumn = subColumn.gridColumn
                const key = [rowKey, colKey].join(",")
                if (subColumn.type === "margin") {
                    elements.push(<HorizontalMargin {...{gridRow, gridColumn}} key={key}/>)
                } else {
                    if (colKey === 0 || colKey === col.subColumns.length - 2) {
                        elements.push(<CornerPadding {...{gridRow, gridColumn}} key={key}/>)
                    } else {
                        elements.push(<VerticalPadding {...{gridRow, gridColumn}} key={key}/>)
                    }
                }
            })
        } else if (subRow.type === "margin") {
            col.subColumns.forEach((subColumn: SubColumn, colKey: number) => {
                let gridRow = subRow.gridRow
                let gridColumn = subColumn.gridColumn
                const key = [rowKey, colKey].join(",")
                if (colKey === col.subColumns.length - 1) {
                    elements.push(<CornerMargin {...{gridRow, gridColumn}} key={key}/>)
                } else {
                    elements.push(<VerticalMargin {...{gridRow, gridColumn}} key={key}/>)
                }
            })
        } else {
            col.subColumns.forEach((subColumn: SubColumn, colKey: number) => {
                let gridRow = subRow.gridRow
                let gridColumn = subColumn.gridColumn
                const key = [rowKey, colKey].join(",")

                if (subColumn.type === "padding") {
                    elements.push(<HorizontalPadding {...{gridRow, gridColumn}} key={key}/>)
                } else if (subColumn.type === "margin") {
                    elements.push(<HorizontalMargin {...{gridRow, gridColumn}} key={key}/>)
                } else {
                    if (!Element) throw new Error("No Element.")
                    elements.push(<Element {...{subRow, subColumn, dispatch, matrix}} key={key}/>)
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
