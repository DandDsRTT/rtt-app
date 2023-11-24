import React from "react"
import { View } from "../../state/types"

const Background = ({view}: {view: View}): React.JSX.Element => {
    const domainElements: React.JSX.Element[] = []
    view.rows.forEach((row, rowKey) => {
        view.cols.forEach((col, colKey) => {
            const rowStart = row.subRows[ 0 ].gridRow
            const colStart = col.subColumns[ 0 ].gridColumn
            const rowEnd = row.subRows[ row.subRows.length - 1 ].gridRow + 1
            const colEnd = col.subColumns[ col.subColumns.length - 1 ].gridColumn + 1
            const key = [rowKey, colKey].join(",")

            domainElements.push(
                <div
                    key={key}
                    style={{
                        gridRowStart: rowStart,
                        gridRowEnd: rowEnd,
                        gridColumnStart: colStart,
                        gridColumnEnd: colEnd,
                        backgroundColor: "grey",
                    }}
                />,
            )
        })
    })

    return <>{domainElements}</>
}

export {
    Background,
}
