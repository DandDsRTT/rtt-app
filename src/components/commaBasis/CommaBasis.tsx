import React from "react"
import {handleCommaBasisCellChange} from "./handlers"
import {useSelector} from "react-redux"
import {ObjectState} from "../../state/types"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {Blank} from "../block/Blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";

const CommaBasis = ({row, column, dispatch}: BlockProps): React.JSX.Element => {
    const matrix = useSelector((state: ObjectState) => state.commaBasis)
    const loading = useSelector((state: ObjectState) => state.loading) 
    
    return PaddingAndMarginWrapper({row, column, Element: CommaBasisElement, dispatch, matrix, loading})
}

const CommaBasisElement = ({subRow, subColumn, dispatch, matrix: commaBasis, loading}: ElementProps): React.JSX.Element => {
    const gridRow = subRow.gridRow
    const gridColumn = subColumn.gridColumn

    if (subRow.type === "gridded" && subColumn.type === "gridded") {
        const commaBasisRowIndex = subRow.index
        const commaBasisColumnIndex = subColumn.index
        if (!commaBasis) throw new Error("No comma basis.")
        if (!dispatch) throw new Error("No dispatch.")
        if (
            commaBasisColumnIndex === undefined ||
            commaBasis[commaBasisColumnIndex] === undefined ||
            commaBasisRowIndex === undefined ||
            commaBasis[commaBasisColumnIndex][commaBasisRowIndex] === undefined
        ) return <Blank {...{gridRow, gridColumn}}/>
        const commaBasisCell = commaBasis[commaBasisColumnIndex][commaBasisRowIndex]
        
        return (
            <div className="square-input" style={{gridRow, gridColumn}}>
                <input
                    value={commaBasisCell}
                    disabled={loading}
                    title={`comma-basis-cell-column-${commaBasisColumnIndex}-row-${commaBasisRowIndex}`}
                    onChange={
                    input => handleCommaBasisCellChange({
                        dispatch,
                        matrix: commaBasis,
                        element: input,
                        address: [commaBasisColumnIndex, commaBasisRowIndex]
                    })}
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
