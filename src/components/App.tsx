import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {ObjectState} from "../state/types";
import {COLS, PRIMES, ROWS} from "../constants";
import {handleMinus, handlePlus} from "./domain/handlers";
import {handleMappingElementChange} from "./mapping/handlers";
import {handleCommaBasisElementChange} from "./commaBasis/handlers";

const App = () => {
    const {dimensionality, view, mapping, commaBasis} = useSelector(
        ({dimensionality, view, mapping, commaBasis}: ObjectState) =>
            ({dimensionality, view, mapping, commaBasis})
    )
    const dispatch = useDispatch()
    console.log('chagne')

    const domain = PRIMES.slice(0, dimensionality)
    const domainElements = domain.map((domainElement, key) => {
        let gridRow = view.rows[ROWS.HEADER].subrows[0].gridRow;
        let gridCo = view.cols[COLS.DOMAIN_PRIMES].subcols[key].gridCol;
        return (
            <div
                className="square-input"
                key={key}
                style={{
                    gridRow: gridRow,
                    gridColumn: gridCo
                }}>
                {domainElement}
            </div>
        )
    })
    
    
    const domainShrinkAndExpandsElements = [];
    for (let i = 0; i < dimensionality; i++) {
        domainShrinkAndExpandsElements.push(
            <button
                onClick={() => handleMinus(dispatch)}
                key={i}
                style={{
                    gridRow: view.rows[ROWS.REMOVES_AND_EXPANDS].subrows[0].gridRow,
                    gridColumn: view.cols[COLS.DOMAIN_PRIMES].subcols[i].gridCol
                }}
            >-</button>
        )
    }
    domainShrinkAndExpandsElements.push(
        <button
            onClick={() => handlePlus(dispatch)}
            key={dimensionality}
            style={{
                gridRow: view.rows[ROWS.REMOVES_AND_EXPANDS].subrows[0].gridRow,
                gridColumn: view.cols[COLS.DOMAIN_PRIMES].subcols[dimensionality].gridCol
            }}
        >+</button>
    )

    const mappingElements = []
    mapping.forEach((mappingRow, rowIndex) => {
        mappingRow.forEach((mappingElement, colIndex) => {
            mappingElements.push(<input
                className="square-input"
                key={[rowIndex, colIndex].join(",")}
                value={mappingElement}
                style={{
                    gridRow: view.rows[ROWS.MAPPING].subrows[rowIndex].gridRow,
                    gridColumn: view.cols[COLS.DOMAIN_PRIMES].subcols[colIndex].gridCol
                }}
                onChange={input => handleMappingElementChange(dispatch, mapping, input, [rowIndex, colIndex])}
            />)
        })
    })


    const commaBasisElements = []
    commaBasis.forEach((comma, colIndex) => {
        comma.forEach((commaElement, rowIndex) => {
            commaBasisElements.push(<input
                className="square-input"
                key={[colIndex, rowIndex].join(",")}
                value={commaElement}
                style={{
                    gridRow: view.rows[ROWS.INTERVALS].subrows[rowIndex].gridRow,
                    gridColumn: view.cols[COLS.COMMAS].subcols[colIndex].gridCol
                }}
                onChange={input => handleCommaBasisElementChange(dispatch, commaBasis, input, [colIndex, rowIndex])}
            />)
        })
    })

    return (
        <div className="container">
            {domainElements}
            {domainShrinkAndExpandsElements}
            {mappingElements}
            {commaBasisElements}
        </div>
    )
}

export {
    App,
}
