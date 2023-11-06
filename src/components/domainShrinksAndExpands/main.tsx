import React from "react";
import {handleMinus, handlePlus} from "../domain/handlers";
import {Col, Row} from "../../state/types";
import {Dispatch} from "@reduxjs/toolkit";

const getDomainRemovesAndExpandsElements = (row: Row, col: Col, dispatch: Dispatch) => {
    const domainShrinkAndExpandsElements = [];
    col.subcols.forEach((subcol, i) => {
        // console.log("what are these subcols", subcol)
        if (subcol.name.slice(0,2) === "p_") {
            // console.log("doing a p minus")
            domainShrinkAndExpandsElements.push(
                <div
                    className="square-input"
                    key={i}
                    style={{
                        gridRow: row.subrows[0].gridRow,
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
                        gridRow: row.subrows[0].gridRow,
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
                        gridRow: row.subrows[0].gridRow,
                        gridColumn: subcol.gridCol
                    }}
                >
                </div>
            )
        }
    })
    
    return domainShrinkAndExpandsElements
}

export {
    getDomainRemovesAndExpandsElements,
}