import React from "react"
import { View } from "../../state/view/types"

const Background = ({ view }: { view: View }): React.JSX.Element => {
    const backgroundElements: React.JSX.Element[] = []
    view.rows.forEach((row, rowKey) => {
        view.cols.forEach((col, colKey) => {
            const gridRowStart = row.subRows[0].gridRow
            const gridColumnStart = col.subCols[0].gridColumn
            const gridRowEnd = row.subRows[row.subRows.length - 1].gridRow + 1
            const gridColumnEnd = col.subCols[col.subCols.length - 1].gridColumn + 1
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
