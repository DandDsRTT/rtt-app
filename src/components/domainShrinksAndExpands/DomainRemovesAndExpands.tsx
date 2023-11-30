import React from "react"
import {handleMinus, handlePlus} from "./handlers"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {Blank} from "../block/Blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";
import {useSelector} from "react-redux";
import {State} from "../../state/types";

const DomainRemovesAndExpands = ({row, column, dispatch}: BlockProps): React.JSX.Element => {
    const commaBasis = useSelector((state: State) => state.objects.commaBasis)
    const dimensionality = useSelector((state: State) => state.objects.dimensionality)
    const rank = useSelector((state: State) => state.objects.rank)
    const loading = useSelector((state: State) => state.view.loading)

    return PaddingAndMarginWrapper({
        row,
        column,
        Element: DomainRemoveOrExpandElement,
        dispatch,
        matrix: commaBasis,
        dimensionality,
        rank,
        loading,
    })
}

const DomainRemoveOrExpandElement = ({subRow, subColumn, dispatch, matrix: commaBasis, dimensionality, loading, rank}: ElementProps): React.JSX.Element => {
    const gridRow = subRow.gridRow
    const gridColumn = subColumn.gridColumn

    if (!commaBasis) throw new Error("No comma basis.")
    if (!dispatch) throw new Error("No dispatch.")
    if (!dimensionality) throw new Error("No dimensionality.")
    if (!rank) throw new Error("No rank.")

    if (subRow.type === "text") {
        return <Blank {...{gridRow, gridColumn}}/>
    } else {
        if (subColumn.type === "gridded" && subColumn.index === dimensionality - 1) {
            return (
                <div className="square-box" style={{gridRow, gridColumn}}>
                    <button
                        disabled={loading}
                        onClick={() => handleMinus({dispatch, matrix: commaBasis, dimensionality, rank})}
                    >
                        -
                    </button>
                </div>
            )
        } else if (subColumn.type === "plus") {
            return (
                <div className="square-box" style={{gridRow, gridColumn}}>
                    <button
                        disabled={loading}
                        onClick={() => handlePlus({dispatch, matrix: commaBasis, dimensionality, rank})}
                    >
                        +
                    </button>
                </div>
            )
        } else {
            return <Blank {...{gridRow, gridColumn}}/>
        }
    }
}

export {
    DomainRemovesAndExpands,
}
