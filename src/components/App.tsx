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
    // console.log('chagne')

    const domainPrimes = PRIMES.slice(0, dimensionality)
    // console.log("view.cols[COLS.DOMAIN_PRIMES]", view.cols[COLS.DOMAIN_PRIMES])
    const domainElements = view.cols[COLS.DOMAIN_PRIMES].subcols.map((subCol, key) => {
        let gridRow = view.rows[ROWS.HEADER].subrows[0].gridRow;
        let gridCo = subCol.gridCol;

        // console.log("subCol.name", subCol.name)
        if (subCol.name === "left margin" || subCol.name === "right margin") {
            return (
                <div
                    key={key}
                    className="margin"
                    style={{
                        gridRow: gridRow,
                        gridColumn: gridCo
                    }}
                >
                </div>
            )
        } else if (subCol.name.slice(0,2) === "p_") {
            return (
                <div
                    key={key}
                    className="square-input"
                    style={{
                        gridRow: gridRow,
                        gridColumn: gridCo
                    }}
                >
                    <input
                        value={domainPrimes[parseInt(subCol.name.replace("p_", "")) - 1]}
                        onChange={() => {
                        }}
                    />
                </div>
            )
        }
    })
    const rowStart = view.rows[ROWS.HEADER].subrows[0].gridRow
    const colStart = view.cols[COLS.DOMAIN_PRIMES].subcols[0].gridCol;
    const rowEnd = view.rows[ROWS.HEADER].subrows[view.rows[ROWS.HEADER].subrows.length - 1].gridRow
    const colEnd = view.cols[COLS.DOMAIN_PRIMES].subcols[view.cols[COLS.DOMAIN_PRIMES].subcols.length - 1].gridCol + 1;
    // console.log(rowStart, colStart, rowEnd, colEnd)
    domainElements.unshift(
        <div className="domain" style={{
            gridRowStart: rowStart,
            gridRowEnd: rowEnd,
            gridColumnStart: colStart,
            gridColumnEnd: colEnd,
            // gridArea: `${rowStart} ${colStart} ${rowEnd} ${colEnd}`,
            backgroundColor: "grey",
            // padding: "10px"
            // margin: "20px"
        }}/>
    )

    const domainShrinkAndExpandsElements = [];
    view.cols[COLS.DOMAIN_PRIMES].subcols.forEach((subcol, i) => {
        // console.log("what are these subcols", subcol)
        if (subcol.name.slice(0,2) === "p_") {
            // console.log("doing a p minus")
            domainShrinkAndExpandsElements.push(
                <div
                    className="square-input"
                    key={i}
                    style={{
                        gridRow: view.rows[ROWS.REMOVES_AND_EXPANDS].subrows[0].gridRow,
                        gridColumn: subcol.gridCol
                    }}
                >
                    <button
                        onClick={() => handleMinus(dispatch)}
                    >-
                    </button>
                </div>
            )
        } else if (subcol.name === "plus") {
            // console.log("doing a plus")
            domainShrinkAndExpandsElements.push(
                <div
                    className="square-input"
                    key={i}
                    style={{
                        gridRow: view.rows[ROWS.REMOVES_AND_EXPANDS].subrows[0].gridRow,
                        gridColumn: subcol.gridCol
                    }}
                >
                    <button
                        onClick={() => handlePlus(dispatch)}
                    >+
                    </button>
                </div>
            )
        } else {
            // console.log("doing a margin")
            domainShrinkAndExpandsElements.push(
                <div
                    key={i}
                    className="margin"
                    style={{
                        gridRow: view.rows[ROWS.REMOVES_AND_EXPANDS].subrows[0].gridRow,
                        gridColumn: subcol.gridCol
                    }}
                >
                </div>
            )
        }
    })

    const mappingElements = []
    view.cols[COLS.DOMAIN_PRIMES].subcols.forEach((subcol, colIndex) => {
        view.rows[ROWS.MAPPING].subrows.forEach((subrow, rowIndex) => {
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
                            gridRow: view.rows[ROWS.MAPPING].subrows[rowIndex].gridRow,
                            gridColumn: view.cols[COLS.DOMAIN_PRIMES].subcols[colIndex].gridCol
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
    const rowStartM = view.rows[ROWS.MAPPING].subrows[0].gridRow
    const colStartM = view.cols[COLS.DOMAIN_PRIMES].subcols[0].gridCol;
    const rowEndM = view.rows[ROWS.MAPPING].subrows[view.rows[ROWS.HEADER].subrows.length - 1].gridRow
    const colEndM = view.cols[COLS.DOMAIN_PRIMES].subcols[view.cols[COLS.DOMAIN_PRIMES].subcols.length - 1].gridCol + 1;
    mappingElements.unshift(
        <div className="mapping" style={{
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

    const commaBasisElements = []
    commaBasis.forEach((comma, colIndex) => {
        comma.forEach((commaElement, rowIndex) => {
            commaBasisElements.push(
                <div
                    className="square-input"
                    style={{
                        gridRow: view.rows[ROWS.INTERVALS].subrows[rowIndex].gridRow,
                        gridColumn: view.cols[COLS.COMMAS].subcols[colIndex].gridCol
                    }}
                    key={[colIndex, rowIndex].join(",")}
                >
                    <input
                        value={commaElement}
                        onChange={input => handleCommaBasisElementChange(dispatch, commaBasis, input, [colIndex, rowIndex])}
                    />
                </div>
            )
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
