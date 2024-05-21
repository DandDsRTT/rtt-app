import React from "react"
import { PRIMES } from "../../constants"
import { PaddingAndMarginWrapper } from "../block/PaddingAndMarginWrapper"
import { Blank } from "../block/Blank"
import { ElementProps } from "../types";
import { BlockProps } from "../block/types";
import { useSelector } from "react-redux";
import { State } from "../../state/types";

const Domain = ({ row, col }: BlockProps): React.JSX.Element => {
    const loading = useSelector((state: State) => state.view.loading)

    return PaddingAndMarginWrapper({ row, col, Element: DomainElement, loading })
}

const DomainElement = ({ subRow, subCol, loading }: ElementProps): React.JSX.Element => {
    const gridRow = subRow.gridRow
    const gridColumn = subCol.gridColumn

    if (subCol.type === "gridded" && subRow.type === "gridded") {
        const domainElementIndex = subCol.index!

        return (
            <div className="square-input" style={{ gridRow, gridColumn }}>
                <input
                    disabled={loading}
                    data-testid={`domain-cell-${domainElementIndex}`}
                    defaultValue={PRIMES[domainElementIndex]}
                />
            </div>
        )
    } else if (subRow.type === "text") {
        return <Blank {...{ gridRow, gridColumn }} />
    } else {
        return <Blank {...{ gridRow, gridColumn }} />
    }
}

export {
    Domain,
}
