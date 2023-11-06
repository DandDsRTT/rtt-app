import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {ObjectState} from "../state/types";
import {COLS, ROWS} from "../constants";
import {getDomainElements} from "./domain/Domain";
import {getDomainRemovesAndExpandsElements} from "./domainShrinksAndExpands/main";
import {getMappingElements} from "./mapping/Mapping";
import {getCommaBasisElements} from "./commaBasis/CommaBasis";

const App = () => {
    const view = useSelector((state: ObjectState) => state.view)
    // const mapping = useSelector((state: ObjectState) => state.mapping)
    // const commaBasis = useSelector((state: ObjectState) => state.commaBasis)
    const dispatch = useDispatch()

    const domainRemovesAndExpandsElements = getDomainRemovesAndExpandsElements(
        view.rows[ROWS.REMOVES_AND_EXPANDS], view.cols[COLS.DOMAIN_PRIMES], dispatch
    )
    const domainElements = getDomainElements(
        view.rows[ROWS.HEADER],              view.cols[COLS.DOMAIN_PRIMES]
    )
    const mappingElements = getMappingElements(
        view.rows[ROWS.MAPPING],             view.cols[COLS.DOMAIN_PRIMES], dispatch, //mapping
    )
    const commaBasisElements = getCommaBasisElements(
        view.rows[ROWS.INTERVALS],           view.cols[COLS.COMMAS],        dispatch, //commaBasis
    )

    return (
        <div className="container">
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
