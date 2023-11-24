import React from "react"
import {handleCommaBasisElementChange} from "./handlers"
import {useSelector} from "react-redux"
import {ObjectState} from "../../state/types"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {blank} from "../block/blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";

const CommaBasis = ({row, col, dispatch}: BlockProps): React.JSX.Element => {
    const matrix = useSelector((state: ObjectState) => state.commaBasis)

    return PaddingAndMarginWrapper({row, col, elementFunction: CommaBasisElement, dispatch, matrix})
}

const CommaBasisElement = ({subrow, subcol, key, dispatch, matrix: commaBasis}: ElementProps): React.JSX.Element => {
    const gridRow = subrow.gridRow
    const gridCol = subcol.gridCol

    if (subrow.name.includes("p_") && subcol.name.includes("c_")) {
        const commaBasisRowIndex = parseInt(subrow.name.replace("p_", "")) - 1
        const commaBasisColIndex = parseInt(subcol.name.replace("c_", "")) - 1
        if (!commaBasis) throw new Error("No comma basis.")
        if (!dispatch) throw new Error("No dispatch.")
        const commaBasisElement = commaBasis[commaBasisColIndex][commaBasisRowIndex]

        return (
            <div
                className="square-input"
                style={{
                    gridRow: gridRow,
                    gridColumn: gridCol,
                }}
                key={key}
            >
                <input
                    value={commaBasisElement}
                    title={`comma-basis-cell-col-${commaBasisColIndex + 1}-row-${commaBasisRowIndex + 1}`}
                    onChange={input => handleCommaBasisElementChange(dispatch, commaBasis, input, [commaBasisColIndex, commaBasisRowIndex])}
                />
            </div>
        )
    } else {
        return blank(gridRow, gridCol, key)
    }
}

export {
    CommaBasis,
}
