import React from "react"
import {handleMinus, handlePlus} from "../domain/handlers"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {blank} from "../block/blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";

const DomainRemovesAndExpands = ({row, col, dispatch}: BlockProps): React.JSX.Element => {
    return PaddingAndMarginWrapper({row, col, elementFunction: DomainRemoveOrExpandElement, dispatch})
}

const DomainRemoveOrExpandElement = ({subrow, subcol, key, dispatch}: ElementProps): React.JSX.Element => {
    const gridRow = subrow.gridRow
    const gridCol = subcol.gridCol
    
    if (!dispatch) throw new Error("No dispatch.")

    if (subrow.name === "text") {
        return blank(gridRow, gridCol, key)
    } else {
        if (subcol.name.slice(0, 2) === "p_") {
            return (
                <div
                    className="square-box"
                    key={key}
                    style={{
                        gridRow: gridRow,
                        gridColumn: gridCol,
                    }}
                >
                    <button
                        onClick={() => handleMinus(dispatch)}
                    >-
                    </button>
                </div>
            )
        } else if (subcol.name === "plus") {
            return (
                <div
                    className="square-box"
                    key={key}
                    style={{
                        gridRow: gridRow,
                        gridColumn: gridCol,
                    }}
                >
                    <button
                        onClick={() => handlePlus(dispatch)}
                    >+
                    </button>
                </div>
            )
        } else {
            return blank(gridRow, gridCol, key)
        }
    }
}

export {
    DomainRemovesAndExpands,
}
