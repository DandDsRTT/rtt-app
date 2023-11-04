import React from "react";
import {handleMappingElementChange} from "./handlers";
import {useDispatch, useSelector} from "react-redux";
import {ObjectState} from "../../types";
import "./styles.scss"

const Mapping = () => {
    const {mapping} = useSelector(({mapping}: ObjectState) => ({mapping}))
    const dispatch = useDispatch()

    const mappingElements = mapping.map((mappingRow, rowIndex) => {
        const mappingRowElements = mappingRow.map((mappingElement, colIndex) => {
            return <input
                className="square-input"
                key={[rowIndex, colIndex].join(",")}
                value={mappingElement}
                onChange={input => handleMappingElementChange(dispatch, mapping, input, [rowIndex, colIndex])}
            />
        })
        return <div className="mapping-row" key={rowIndex}>{mappingRowElements}</div>
    })

    return (
        <div className="mapping">
            {mappingElements}
        </div>
    )
}

export {
    Mapping,
}