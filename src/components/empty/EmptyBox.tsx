import React from "react"
import { ElementProps } from "../types";
import { BlockProps } from "../block/types";
import { SubCol } from "../../state/view/types";
import { CornerMargin, HorizontalMargin, VerticalMargin } from "../block/Margin";

const EmptyBox = ({ row, col }: BlockProps): React.JSX.Element => {
    let elements: React.JSX.Element[] = []

    row.subRows.forEach((subRow, rowKey) => {
        if (subRow.type === "padding") {
            col.subCols.forEach((subCol: SubCol, colKey: number) => {
                let gridRow = subRow.gridRow
                let gridColumn = subCol.gridColumn
                const key = [rowKey, colKey].join(",")
                const gridLineHorizontal = subRow.type === "gridded"
                if (subCol.type === "margin") {
                    elements.push(<HorizontalMargin {...{ gridRow, gridColumn, gridLineHorizontal }} key={key} />)
                } else {
                    if (colKey === 0 || colKey === col.subCols.length - 2) {
                        elements.push(<CornerMargin {...{ gridRow, gridColumn }} key={key} />)
                    } else {
                        const gridLineVertical = subCol.type === "gridded"
                        elements.push(<VerticalMargin {...{ gridRow, gridColumn, gridLineVertical }} key={key} />)
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

                if (subCol.type === "padding" || subCol.type === "margin") {
                    const gridLineHorizontal = subRow.type === "gridded"
                    elements.push(<HorizontalMargin {...{ gridRow, gridColumn, gridLineHorizontal }} key={key} />)
                } else {
                    if (!Element) throw new Error("No Element.")
                    elements = elements.concat(emptyBoxElements({ ...{ subRow, subCol, key } }))
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

const emptyBoxElements = ({ subRow, subCol, key }: EmptyBoxElementProps): React.JSX.Element[] => {
    const gridRow = subRow.gridRow
    const gridColumn = subCol.gridColumn

    if (subCol.type === "gridded" && subRow.type === "gridded") {
        return [
            <div key={key} style={{ gridRow, gridColumn }} className="empty-box-element">
                <div className="grid-line-horizontal"></div>
            </div>,
            <div key={`${key}a`} style={{ gridRow, gridColumn }} className="empty-box-element">
                <div className="grid-line-vertical"></div>
            </div>
        ]
    } else if (subRow.type === "gridded") {
        return [
            <div key={key} style={{ gridRow, gridColumn }} className="empty-box-element">
                <div className="grid-line-horizontal"></div>
            </div>
        ]
    } else if (subCol.type === "gridded") {
        return [
            <div key={key} style={{ gridRow, gridColumn }} className="empty-box-element">
                <div className="grid-line-vertical"></div>
            </div>
        ]
    } else {
        return [
            <div key={key} style={{ gridRow, gridColumn }}>
            </div>
        ]
    }
}

export {
    EmptyBox,
}
