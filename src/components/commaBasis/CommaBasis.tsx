import React from "react"
import {handleCommaBasisElementChange} from "./handlers"
import {useSelector} from "react-redux"
import {ObjectState} from "../../state/types"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {Blank} from "../block/Blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";

const CommaBasis = ({row, col, dispatch}: BlockProps): React.JSX.Element => {
    const matrix = useSelector((state: ObjectState) => state.commaBasis)

    return PaddingAndMarginWrapper({row, col, Element: CommaBasisElement, dispatch, matrix})
}

const CommaBasisElement = ({subRow, subColumn, dispatch, matrix: commaBasis}: ElementProps): React.JSX.Element => {
    const gridRow = subRow.gridRow
    const gridColumn = subColumn.gridColumn

    if (subRow.type === "gridded" && subColumn.type === "gridded") {
        const commaBasisRowIndex = subRow.index!
        const commaBasisColIndex = subColumn.index!
        if (!commaBasis) throw new Error("No comma basis.")
        if (!dispatch) throw new Error("No dispatch.")
        const commaBasisElement = commaBasis[commaBasisColIndex][commaBasisRowIndex]
        
        return (
            <div
                className="square-input"
                style={{gridRow, gridColumn}}
            >
                <input
                    value={commaBasisElement}
                    title={`comma-basis-cell-col-${commaBasisColIndex}-row-${commaBasisRowIndex}`}
                    onChange={input => handleCommaBasisElementChange(dispatch, commaBasis, input, [commaBasisColIndex, commaBasisRowIndex])}
                />
            </div>
        )
    } else {
        return <Blank {...{gridRow, gridColumn}}/>
    }
}

export {
    CommaBasis,
}
