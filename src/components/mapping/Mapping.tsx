import React from "react"
import {handleMappingElementChange} from "./handlers"
import {useSelector} from "react-redux"
import {ObjectState} from "../../state/types"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {blank} from "../block/blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";

const Mapping = ({row, col, dispatch}: BlockProps): React.JSX.Element => {
    const matrix = useSelector((state: ObjectState) => state.mapping)

    return PaddingAndMarginWrapper({row, col, elementFunction: MappingElement, dispatch, matrix})
}

const MappingElement = ({subrow, subcol, key, dispatch, matrix: mapping}: ElementProps): React.JSX.Element => {
    const gridRow = subrow.gridRow
    const gridCol = subcol.gridCol

    if (subcol.name.slice(0, 2) === "p_" && subrow.name.slice(0, 2) === "g_") {
        const generatorIndex = parseInt(subrow.name.replace("g_", "")) - 1
        const primeIndex = parseInt(subcol.name.replace("p_", "")) - 1
        if (!mapping) throw new Error("No mapping.")
        if (!dispatch) throw new Error("No dispatch.")
        const mappingElement = mapping[generatorIndex][primeIndex]

        return (
            <div
                className="square-input"
                key={key}
                style={{
                    gridRow: gridRow,
                    gridColumn: gridCol,
                }}
            >
                <input
                    value={mappingElement}
                    title={`mapping-cell-row-${generatorIndex + 1}-col-${primeIndex + 1}`}
                    onChange={input => handleMappingElementChange(dispatch, mapping, input, [generatorIndex, primeIndex])}
                />
            </div>
        )
    } else {
        return blank(gridRow, gridCol, key)
    }
}

export {
    Mapping,
}
