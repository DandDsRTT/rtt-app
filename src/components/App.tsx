import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ObjectState } from "../state/types"
import { COLS, ROWS } from "../constants"
import { getDomainElements } from "./domain/elements"
import { getDomainRemovesAndExpandsElements } from "./domainShrinksAndExpands/elements"
import { getMappingElements } from "./mapping/elements"
import { getCommaBasisElements } from "./commaBasis/elements"
import { getBackgroundElements } from "./block/background"

const App = () => {
    const view = useSelector((state: ObjectState) => state.view)
    const dispatch = useDispatch()

    const blockElements = getBackgroundElements(view)
    const domainRemovesAndExpandsElements = getDomainRemovesAndExpandsElements(
        view.rows[ ROWS.REMOVES_AND_EXPANDS ], view.cols[ COLS.DOMAIN_PRIMES ], dispatch,
    )
    const domainElements = getDomainElements(
        view.rows[ ROWS.HEADER ], view.cols[ COLS.DOMAIN_PRIMES ],
    )
    const mappingElements = getMappingElements(
        view.rows[ ROWS.MAPPING ], view.cols[ COLS.DOMAIN_PRIMES ], dispatch,
    )
    const commaBasisElements = getCommaBasisElements(
        view.rows[ ROWS.INTERVALS ], view.cols[ COLS.COMMAS ], dispatch,
    )

    return (
        <div className="container">
            {/*{blockElements}*/}
            {domainRemovesAndExpandsElements}
            {domainElements}
            {mappingElements}
            {commaBasisElements}
        </div>
    )
}

export {
    App,
}
