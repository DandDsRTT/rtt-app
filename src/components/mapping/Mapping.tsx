import React from "react";
// import {handleMappingElementChange} from "./handlers";
// import {useDispatch, useSelector} from "react-redux";
// import {ObjectState} from "../../state/types";
// import "./styles.scss"
// import {COLS, ROWS} from "../../constants";
//
// const Mapping = () => {
//     const {mapping, view} = useSelector(({mapping, view}: ObjectState) => ({mapping, view}))
//     const dispatch = useDispatch()
//
//    
//
//     return (
//         <div className="mapping">
//             {mappingElements}
//         </div>
//     )
// }
//
// export {
//     Mapping,
// }

import {handleMappingElementChange} from "./handlers";
import {useSelector} from "react-redux";
import {Col, ObjectState, Row} from "../../state/types";
import {Dispatch} from "@reduxjs/toolkit";

const getMappingElements = (row: Row, col: Col, dispatch: Dispatch) => {
    const mapping = useSelector((state: ObjectState) => state.mapping)

    const mappingElements = []
    col.subcols.forEach((subcol, colIndex) => {
        row.subrows.forEach((subrow, rowIndex) => {
            // console.log(subcol.name.slice(0,2))
            if (subcol.name.slice(0,2) === "p_" && subrow.name.slice(0,2) === "g_") {
                let primeIndex = parseInt(subcol.name.replace("p_", "")) - 1;
                // console.log("subrow.name", subrow.name)
                let generatorIndex = parseInt(subrow.name.replace("g_", "")) - 1;
                // console.log("primeIndex", primeIndex, "generatorIndex", generatorIndex, "mapping", mapping)
                let mappingElement = mapping[generatorIndex][primeIndex];
                mappingElements.push(
                    <div
                        className="square-input"
                        key={[rowIndex, colIndex].join(",")}
                        style={{
                            gridRow: row.subrows[rowIndex].gridRow,
                            gridColumn: col.subcols[colIndex].gridCol
                        }}
                    >
                        <input
                            value={mappingElement}
                            onChange={input => handleMappingElementChange(dispatch, mapping, input, [rowIndex, colIndex])}
                        />
                    </div>
                )
            } else {
                mappingElements.push(
                    <div
                        key={[rowIndex, colIndex].join(",")}
                        className="margin"
                        style={{
                            gridRow: subrow.gridRow,
                            gridColumn: subcol.gridCol
                        }}
                    >
                    </div>
                )
            }
        })
    })
    const rowStartM = row.subrows[0].gridRow
    const colStartM = col.subcols[0].gridCol;
    const rowEndM = row.subrows[row.subrows.length - 1].gridRow
    const colEndM = col.subcols[col.subcols.length - 1].gridCol + 1;
    mappingElements.unshift(
        <div className="mapping" key={"whole"} style={{
            gridRowStart: rowStartM,
            gridRowEnd: rowEndM,
            gridColumnStart: colStartM,
            gridColumnEnd: colEndM,
            // gridArea: `${rowStart} ${colStart} ${rowEnd} ${colEnd}`,
            backgroundColor: "grey",
            // padding: "10px"
            // margin: "20px"
        }}/>
    )
    
    return mappingElements
}

export {
    getMappingElements,
}