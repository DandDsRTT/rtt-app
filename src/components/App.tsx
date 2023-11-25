import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {ObjectState} from "../state/types"
import {COLS, ROWS} from "../constants"
import {Domain} from "./domain/Domain"
import {DomainRemovesAndExpands} from "./domainShrinksAndExpands/DomainRemovesAndExpands"
import {Mapping} from "./mapping/Mapping"
import {CommaBasis} from "./commaBasis/CommaBasis"
import {Background} from "./block/Background"

const App = (): React.JSX.Element => {
    const view = useSelector((state: ObjectState) => state.view)
    const dispatch = useDispatch()
    
    const domainProps = {row: view.rows[ROWS.HEADER], column: view.cols[COLS.DOMAIN_PRIMES]}
    const domainRemovesAndExpandsProps = {
        row: view.rows[ROWS.REMOVES_AND_EXPANDS],
        column: view.cols[COLS.DOMAIN_PRIMES],
        dispatch
    }
    const mappingProps = {row: view.rows[ROWS.MAPPING], column: view.cols[COLS.DOMAIN_PRIMES], dispatch}
    const commaBasisProps = {row: view.rows[ROWS.INTERVALS], column: view.cols[COLS.COMMAS], dispatch}

    return (
        <div className="container">
            {/*<Background {...{view}}/>*/}
            <Domain {...domainProps}/>
            <DomainRemovesAndExpands {...domainRemovesAndExpandsProps}/>
            <Mapping {...mappingProps} />
            <CommaBasis {...commaBasisProps} />
        </div>
    )
}

export {
    App,
}
