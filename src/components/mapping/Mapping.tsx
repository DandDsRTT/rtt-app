import React from "react"
import {handleMappingElementChange} from "./handlers"
import {useSelector} from "react-redux"
import {ObjectState} from "../../state/types"
import {PaddingAndMarginWrapper} from "../block/PaddingAndMarginWrapper"
import {Blank} from "../block/Blank"
import {ElementProps} from "../types";
import {BlockProps} from "../block/types";
import {SUBSCRIPTS} from "../../constants";

const Mapping = ({row, column, dispatch}: BlockProps): React.JSX.Element => {
    const matrix = useSelector((state: ObjectState) => state.mapping)
    const loading = useSelector((state: ObjectState) => state.loading)
    
    return PaddingAndMarginWrapper({row, column, Element: MappingElement, dispatch, matrix, loading})
}

const MappingElement = ({subRow, subColumn, dispatch, matrix: mapping, loading}: ElementProps): React.JSX.Element => {
    const gridRow = subRow.gridRow
    const gridColumn = subColumn.gridColumn

    if (!mapping) throw new Error("No mapping.")

    if (subColumn.type === "gridded" && subRow.type === "gridded") {
        const generatorIndex = subRow.index
        const primeIndex = subColumn.index
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
                    disabled={loading}
                    data-testid={`mapping-cell-row-${generatorIndex}-column-${primeIndex}`}
                    title={`𝑚${SUBSCRIPTS[generatorIndex]}${SUBSCRIPTS[primeIndex]}`}
                    onChange={input => handleMappingElementChange({
                        dispatch,
                        matrix: mapping,
                        element: input,
                        address: [generatorIndex, primeIndex]
                    })}
                />
            </div>
        )
    } else if (subRow.type === "name" && subColumn.index === 0) {
        return (
            <div 
                className="box-name" 
                style={{gridRow, gridColumnStart: gridColumn, gridColumnEnd: gridColumn + mapping[0].length}}
            >
                mapping
            </div>
        )
    } else {
        return <Blank {...{gridRow, gridColumn}}/>
    }
}

export {
    Mapping,
}
