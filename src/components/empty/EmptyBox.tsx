import React from "react"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";
import {SubColumn} from "../../state/types";
import {CornerMargin, HorizontalMargin, VerticalMargin} from "../block/Margin";

const EmptyBox = ({row, column}: BlockProps): React.JSX.Element => {
    let elements: React.JSX.Element[] = []

    row.subRows.forEach((subRow, rowKey) => {
        if (subRow.type === "padding") {
            column.subColumns.forEach((subColumn: SubColumn, colKey: number) => {
                let gridRow = subRow.gridRow
                let gridColumn = subColumn.gridColumn
                const key = [rowKey, colKey].join(",")
                const gridLineHorizontal = subRow.type === "gridded"
                if (subColumn.type === "margin") {
                    elements.push(<HorizontalMargin {...{gridRow, gridColumn, gridLineHorizontal}} key={key}/>)
                } else {
                    if (colKey === 0 || colKey === column.subColumns.length - 2) {
                        elements.push(<CornerMargin {...{gridRow, gridColumn}} key={key}/>)
                    } else {
                        const gridLineVertical = subColumn.type === "gridded"
                        elements.push(<VerticalMargin {...{gridRow, gridColumn, gridLineVertical}} key={key}/>)
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

                if (subColumn.type === "padding" || subColumn.type === "margin") {
                    const gridLineHorizontal = subRow.type === "gridded"
                    elements.push(<HorizontalMargin {...{gridRow, gridColumn, gridLineHorizontal}} key={key}/>)
                } else {
                    if (!Element) throw new Error("No Element.")
                    elements = elements.concat(emptyBoxElements({...{subRow, subColumn, key}}))
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

interface EmptyBoxElementProps extends ElementProps {
    key: string,
}

const emptyBoxElements = ({subRow, subColumn, key}: EmptyBoxElementProps): React.JSX.Element[] => {
    const gridRow = subRow.gridRow
    const gridColumn = subColumn.gridColumn

    if (subColumn.type === "gridded" && subRow.type === "gridded") {
        return [
            <div key={key} style={{gridRow, gridColumn}} className="empty-box-element">
                <div className="grid-line-horizontal"></div>
            </div>,
            <div key={`${key}a`} style={{gridRow, gridColumn}} className="empty-box-element">
                <div className="grid-line-vertical"></div>
            </div>
        ]
    } else if (subRow.type === "gridded") {
        return [
            <div key={key} style={{gridRow, gridColumn}} className="empty-box-element">
                <div className="grid-line-horizontal"></div>
            </div>
        ]
    } else if (subColumn.type === "gridded") {
        return [
            <div key={key} style={{gridRow, gridColumn}} className="empty-box-element">
                <div className="grid-line-vertical"></div>
            </div>
        ]
    } else {
        return [
            <div key={key} style={{gridRow, gridColumn}}>
            </div>
        ]
    }
}

export {
    EmptyBox,
}
