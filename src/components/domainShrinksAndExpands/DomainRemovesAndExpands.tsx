import React from "react"
import {handleMinus, handlePlus} from "../domain/handlers"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {Blank} from "../block/Blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";

const DomainRemovesAndExpands = ({row, col, dispatch}: BlockProps): React.JSX.Element => {
    return PaddingAndMarginWrapper({row, col, Element: DomainRemoveOrExpandElement, dispatch})
}

const DomainRemoveOrExpandElement = ({subRow, subColumn, key, dispatch}: ElementProps): React.JSX.Element => {
    const gridRow = subRow.gridRow
    const gridColumn = subColumn.gridColumn
    
    if (!dispatch) throw new Error("No dispatch.")

    if (subRow.type === "text") {
        return <Blank {...{gridRow, gridColumn, key}}/>
    } else {
        if (subColumn.type === "gridded") {
            return (
                <div
                    className="square-box"
                    key={key}
                    style={{
                        gridRow,
                        gridColumn,
                    }}
                >
                    <button
                        onClick={() => handleMinus(dispatch)}
                    >-
                    </button>
                </div>
            )
        } else if (subColumn.type === "plus") {
            return (
                <div
                    className="square-box"
                    key={key}
                    style={{
                        gridRow,
                        gridColumn,
                    }}
                >
                    <button
                        onClick={() => handlePlus(dispatch)}
                    >+
                    </button>
                </div>
            )
        } else {
            return <Blank {...{gridRow, gridColumn, key}}/>
        }
    }
}

export {
    DomainRemovesAndExpands,
}
