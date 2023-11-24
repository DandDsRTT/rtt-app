import React from "react"
import { View } from "../../state/types"

const Background = ({view}: {view: View}): React.JSX.Element => {
    const domainElements: React.JSX.Element[] = []
    view.rows.forEach((row, rowKey) => {
        view.cols.forEach((col, colKey) => {
            const rowStart = row.subrows[ 0 ].gridRow
            const colStart = col.subcols[ 0 ].gridCol
            const rowEnd = row.subrows[ row.subrows.length - 1 ].gridRow
            const colEnd = col.subcols[ col.subcols.length - 1 ].gridCol + 1
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
