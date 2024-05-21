import React from "react"
import { handleMinus, handlePlus } from "./handlers"
import { PaddingAndMarginWrapper } from "../block/PaddingAndMarginWrapper"
import { Blank } from "../block/Blank"
import { ElementProps } from "../types";
import { BlockProps } from "../block/types";
import { useSelector } from "react-redux";
import { State } from "../../state/types";

const DomainRemovesAndExpands = ({ row, col, dispatch }: BlockProps): React.JSX.Element => {
    const commaBasis = useSelector((state: State) => state.objects.commaBasis)
    const dimensionality = useSelector((state: State) => state.objects.dimensionality)
    const loading = useSelector((state: State) => state.view.loading)

    return PaddingAndMarginWrapper({
        row,
        col,
        Element: DomainRemoveOrExpandElement,
        dispatch,
        matrix: commaBasis,
        dimensionality,
        loading,
    })
}

const DomainRemoveOrExpandElement = ({ subRow, subCol, dispatch, matrix: commaBasis, dimensionality, loading }: ElementProps): React.JSX.Element => {
    const gridRow = subRow.gridRow
    const gridColumn = subCol.gridColumn

    if (!commaBasis) throw new Error("No comma basis.")
    if (!dispatch) throw new Error("No dispatch.")
    if (!dimensionality) throw new Error("No dimensionality.")

    if (subRow.type === "text") {
        return <Blank {...{ gridRow, gridColumn }} />
    } else {
        if (subCol.type === "gridded" && subCol.index === dimensionality - 1) {
            return (
                <div className="square-box" style={{ gridRow, gridColumn }}>
                    <button
                        disabled={loading}
                        onClick={() => handleMinus({ dispatch, matrix: commaBasis, dimensionality })}
                    >
                        -
                    </button>
                </div>
            )
        } else if (subCol.type === "plus") {
            return (
                <div className="square-box" style={{ gridRow, gridColumn }}>
                    <button
                        disabled={loading}
                        onClick={() => handlePlus({ dispatch, matrix: commaBasis, dimensionality })}
                    >
                        +
                    </button>
                </div>
            )
        } else {
            return <Blank {...{ gridRow, gridColumn }} />
        }
    }
}

export {
    DomainRemovesAndExpands,
}
