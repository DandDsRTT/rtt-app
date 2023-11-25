import React from "react"
import { View } from "../../state/types"

const Background = ({view}: {view: View}): React.JSX.Element => {
    const backgroundElements: React.JSX.Element[] = []
    view.rows.forEach((row, rowKey) => {
        view.cols.forEach((column, colKey) => {
            const gridRowStart = row.subRows[ 0 ].gridRow
            const gridColumnStart = column.subColumns[ 0 ].gridColumn
            const gridRowEnd = row.subRows[ row.subRows.length - 1 ].gridRow + 1
            const gridColumnEnd = column.subColumns[ column.subColumns.length - 1 ].gridColumn + 1
            const key = [rowKey, colKey].join(",")

            backgroundElements.push(
                <div
                    key={key}
                    style={{
                        gridRowStart,
                        gridRowEnd,
                        gridColumnStart,
                        gridColumnEnd,
                        backgroundColor: "grey",
                    }}
                />,
            )
        })
    })

    return <>{backgroundElements}</>
}

export {
    Background,
}
