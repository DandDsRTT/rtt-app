import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {COLS, ROWS} from "../constants"
import {Domain} from "./domain/Domain"
import {DomainRemovesAndExpands} from "./domainShrinksAndExpands/DomainRemovesAndExpands"
import {Mapping} from "./mapping/Mapping"
import {CommaBasis} from "./commaBasis/CommaBasis"
import {Undo} from "./undo/Undo";
import {EmptyBox} from "./empty/EmptyBox";
import {State} from "../state/types";

const App = (): React.JSX.Element => {
    const view = useSelector((state: State) => state.view.view)
    const dispatch = useDispatch()

    return (
        <div>
            <Undo/>
            <div className="container">
                {/*<Background {...{view}}/>*/}

                {/* REMOVES AND EXPANDS*/}
                <DomainRemovesAndExpands {...{
                    row: view.rows[ROWS.REMOVES_AND_EXPANDS],
                    column: view.cols[COLS.DOMAIN_PRIMES],
                    dispatch
                }}/>
                <EmptyBox {...{row: view.rows[ROWS.REMOVES_AND_EXPANDS], column: view.cols[COLS.COMMAS]}} />
                
                {/* HEADER */}
                <Domain {...{row: view.rows[ROWS.HEADER], column: view.cols[COLS.DOMAIN_PRIMES]}}/>
                <EmptyBox {...{row: view.rows[ROWS.HEADER], column: view.cols[COLS.COMMAS]}} />
                
                {/* INTERVALS*/}
                <CommaBasis {...{row: view.rows[ROWS.INTERVALS], column: view.cols[COLS.COMMAS], dispatch}} />
                <EmptyBox {...{row: view.rows[ROWS.INTERVALS], column: view.cols[COLS.DOMAIN_PRIMES]}} />

                {/* MAPPING */}
                <Mapping {...{row: view.rows[ROWS.MAPPING], column: view.cols[COLS.DOMAIN_PRIMES], dispatch}} />
                <EmptyBox {...{row: view.rows[ROWS.MAPPING], column: view.cols[COLS.COMMAS]}} />
            </div>
        </div>
    )
}

export {
    App,
}
