import React from "react"
import { PRIMES } from "../../constants"
import { Col, Row, SubCol, SubRow } from "../../state/types"
import { includePaddingAndMargin } from "../block/includePaddingAndMargin"
import { blank } from "../block/blank"

const getDomainElements = (row: Row, col: Col): React.JSX.Element[] => {
    return includePaddingAndMargin(row, col, getDomainElement, {})
}

const getDomainElement = (subrow: SubRow, subcol: SubCol, key: string) => {
    const gridRow = subrow.gridRow
    const gridCol = subcol.gridCol

    if (subcol.name.includes("p_") && subrow.name === "gridded") {
        const domainElementIndex = parseInt(subcol.name.replace("p_", "")) - 1

        return (
            <div
                key={key}
                className="square-input"
                style={{
                    gridRow: gridRow,
                    gridColumn: gridCol,
                }}
            >
                <input
                    title={`domain-cell-${domainElementIndex+1}`}
                    value={PRIMES[ domainElementIndex ]}
                    onChange={() => {
                    }}
                />
            </div>
        )
    } else if (subrow.name === "text") {
        return blank(gridRow, gridCol, key)
    } else {
        return blank(gridRow, gridCol, key)
    }
}

export {
    getDomainElements,
}
