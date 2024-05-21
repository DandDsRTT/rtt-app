import React from "react"
import { handleCommaBasisCellChange } from "./handlers"
import { useSelector } from "react-redux"
import { ViewState } from "../../state/view/types"
import { PaddingAndMarginWrapper } from "../block/PaddingAndMarginWrapper"
import { Blank } from "../block/Blank"
import { ElementProps } from "../types";
import { BlockProps } from "../block/types";
import { SUBSCRIPTS } from "../../constants";
import { State } from "../../state/types";

const CommaBasis = ({ row, col, dispatch }: BlockProps): React.JSX.Element => {
    const matrix = useSelector((state: State) => state.objects.commaBasis)
    const rank = useSelector((state: State) => state.objects.rank)
    const dimensionality = useSelector((state: State) => state.objects.dimensionality)
    const loading = useSelector((state: State) => state.view.loading)

    return PaddingAndMarginWrapper({
        row,
        col,
        Element: CommaBasisElement,
        dispatch,
        matrix,
        loading,
        dimensionality,
        rank,
    })
}

const CommaBasisElement = (elementProps: ElementProps): React.JSX.Element => {
    const {
        subRow,
        subCol,
        dispatch,
        matrix: commaBasis,
        loading,
        dimensionality,
    } = elementProps
    const gridRow = subRow.gridRow
    const gridColumn = subCol.gridColumn

    if (!commaBasis) throw new Error("No comma basis.")
    if (!dimensionality) throw new Error("No dimensionality.")

    if (subRow.type === "gridded" && subCol.type === "gridded") {
        const commaBasisRowIndex = subRow.index
        const commaBasisColumnIndex = subCol.index
        if (!dispatch) throw new Error("No dispatch.")
        if (
            commaBasisColumnIndex === undefined ||
            commaBasis[commaBasisColumnIndex] === undefined ||
            commaBasisRowIndex === undefined ||
            commaBasis[commaBasisColumnIndex][commaBasisRowIndex] === undefined
        ) return <Blank {...{ gridRow, gridColumn }} />
        const commaBasisCell = commaBasis[commaBasisColumnIndex][commaBasisRowIndex]

        return (
            <div className="square-input" style={{ gridRow, gridColumn }}>
                <input
                    value={commaBasisCell}
                    disabled={loading}
                    data-testid={`comma-basis-cell-col-${commaBasisColumnIndex}-row-${commaBasisRowIndex}`}
                    title={`𝑐${SUBSCRIPTS[commaBasisColumnIndex]}${SUBSCRIPTS[commaBasisRowIndex]}`}
                    onChange={
                        input => handleCommaBasisCellChange({
                            dispatch,
                            matrix: commaBasis,
                            element: input,
                            address: [commaBasisColumnIndex, commaBasisRowIndex],
                            dimensionality,
                        })}
                />
            </div>
        )
    } else if (subRow.type === "name" && subCol.index === 0) {
        return (
            <div
                className="box-name"
                style={{ gridRow, gridColumnStart: gridColumn, gridColumnEnd: gridColumn + commaBasis.length }}
            >
                comma basis
            </div>
        )
    } else {
        return <Blank {...{ gridRow, gridColumn }} />
    }
}

export {
    CommaBasis,
}
