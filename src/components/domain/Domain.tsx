import React from "react"
import { PRIMES } from "../../constants"
import { PaddingAndMarginWrapper } from "../block/PaddingAndMarginWrapper"
import { blank } from "../block/blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";

const Domain = ({row, col}: BlockProps): React.JSX.Element => {
    return PaddingAndMarginWrapper({row, col, elementFunction: DomainElement })
}

const DomainElement = ({subrow, subcol, key}: ElementProps): React.JSX.Element => {
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
    Domain,
}
