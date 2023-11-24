import React from "react"
import { PRIMES } from "../../constants"
import { PaddingAndMarginWrapper } from "../block/PaddingAndMarginWrapper"
import { Blank } from "../block/Blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";

const Domain = ({row, col}: BlockProps): React.JSX.Element => {
    return PaddingAndMarginWrapper({row, col, Element: DomainElement })
}

const DomainElement = ({subRow, subColumn, key}: ElementProps): React.JSX.Element => {
    const gridRow = subRow.gridRow
    const gridColumn = subColumn.gridColumn

    if (subColumn.type === "gridded" && subRow.type === "gridded") {
        const domainElementIndex = subColumn.index!

        return (
            <div
                key={key}
                className="square-input"
                style={{gridRow, gridColumn}}
            >
                <input
                    title={`domain-cell-${domainElementIndex}`}
                    value={PRIMES[ domainElementIndex ]}
                    onChange={() => {
                    }}
                />
            </div>
        )
    } else if (subRow.type === "text") {
        return <Blank {...{gridRow, gridColumn, key}}/>
    } else {
        return <Blank {...{gridRow, gridColumn, key}}/>
    }
}

export {
    Domain,
}
