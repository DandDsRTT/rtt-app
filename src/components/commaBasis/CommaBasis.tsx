import React from "react"
import {handleCommaBasisCellChange} from "./handlers"
import {useSelector} from "react-redux"
import {ObjectState} from "../../state/types"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {Blank} from "../block/Blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";
import {SUBSCRIPTS} from "../../constants";

const CommaBasis = ({row, column, dispatch}: BlockProps): React.JSX.Element => {
    const matrix = useSelector((state: ObjectState) => state.commaBasis)
    const loading = useSelector((state: ObjectState) => state.loading)

    return PaddingAndMarginWrapper({row, column, Element: CommaBasisElement, dispatch, matrix, loading})
}

const CommaBasisElement = (elementProps: ElementProps): React.JSX.Element => {
    const {
        subRow,
        subColumn,
        dispatch,
        matrix: commaBasis,
        loading
    } = elementProps
    const gridRow = subRow.gridRow
    const gridColumn = subColumn.gridColumn

    if (!commaBasis) throw new Error("No comma basis.")

    if (subRow.type === "gridded" && subColumn.type === "gridded") {
        const commaBasisRowIndex = subRow.index
        const commaBasisColumnIndex = subColumn.index
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
                    data-testid={`comma-basis-cell-column-${commaBasisColumnIndex}-row-${commaBasisRowIndex}`}
                    title={`𝑐${SUBSCRIPTS[commaBasisColumnIndex]}${SUBSCRIPTS[commaBasisRowIndex]}`}
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
    } else if (subRow.type === "name" && subColumn.index === 0) {
        return (
            <div 
                className="box-name" 
                style={{gridRow, gridColumnStart: gridColumn, gridColumnEnd: gridColumn + commaBasis.length}}
            >
                comma basis
            </div>
        )
    } else {
        return <Blank {...{gridRow, gridColumn}}/>
    }
}

export {
    CommaBasis,
}
