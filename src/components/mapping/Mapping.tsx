import React from "react"
import {handleMappingElementChange} from "./handlers"
import {useSelector} from "react-redux"
import {ObjectState} from "../../state/types"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {Blank} from "../block/Blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";

const Mapping = ({row, column, dispatch}: BlockProps): React.JSX.Element => {
    const matrix = useSelector((state: ObjectState) => state.mapping)

    return PaddingAndMarginWrapper({row, column, Element: MappingElement, dispatch, matrix})
}

const MappingElement = ({subRow, subColumn, dispatch, matrix: mapping}: ElementProps): React.JSX.Element => {
    const gridRow = subRow.gridRow
    const gridColumn = subColumn.gridColumn

    if (subColumn.type === "gridded" && subRow.type === "gridded") {
        const generatorIndex = subRow.index
        const primeIndex = subColumn.index
        if (!mapping) throw new Error("No mapping.")
        if (!dispatch) throw new Error("No dispatch.")
        if (
            generatorIndex === undefined ||
            mapping[generatorIndex] === undefined ||
            primeIndex === undefined ||
            mapping[generatorIndex][primeIndex] === undefined
        ) return <Blank {...{gridRow, gridColumn}}/>

        const mappingElement = mapping[generatorIndex][primeIndex]

        return (
            <div
                className="square-input"
                style={{gridRow, gridColumn}}
            >
                <input
                    value={mappingElement}
                    title={`mapping-cell-row-${generatorIndex}-column-${primeIndex}`}
                    onChange={input => handleMappingElementChange({
                        dispatch,
                        matrix: mapping,
                        element: input,
                        address: [generatorIndex, primeIndex]
                    })}
                />
            </div>
        )
    } else {
        return <Blank {...{gridRow, gridColumn}}/>
    }
}

export {
    Mapping,
}
