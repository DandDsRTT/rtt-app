import React from "react";
import {PRIMES} from "../../constants";

const getDomainElements = (row, col) => {
    // const domainPrimes = PRIMES.slice(0, dimensionality)
    // console.log("col", col)
    const domainElements = col.subcols.map((subCol, key) => {
        let gridRow = row.subrows[0].gridRow;
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
                        value={PRIMES[parseInt(subCol.name.replace("p_", "")) - 1]}
                        onChange={() => {
                        }}
                    />
                </div>
            )
        }
        // } else {
        //     return (<div key={key}></div>)
        // }
    })
    
    const rowStart = row.subrows[0].gridRow
    const colStart = col.subcols[0].gridCol;
    const rowEnd = row.subrows[row.subrows.length - 1].gridRow
    const colEnd = col.subcols[col.subcols.length - 1].gridCol + 1;
    // console.log(rowStart, colStart, rowEnd, colEnd)
    domainElements.unshift(
        <div className="domain" key={"whole"} style={{
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
    
    return domainElements
}

export {
    getDomainElements
}