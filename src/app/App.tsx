import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { actionTypes } from "./actions"
import { MyState } from "./types"
import { PRIMES } from "./constants"

const App = () => {
    console.log("reredner")
    const {
        standardDomainPrimeCount,
        mapping,
    } = useSelector((state: MyState) => ({
        standardDomainPrimeCount: state.standardDomainPrimeCount,
        mapping: state.mapping,
    }))
    const dispatch = useDispatch()
    const handlePlus = () => dispatch({ type: actionTypes.EXPAND_DOMAIN })
    const handleMinus = () => dispatch({ type: actionTypes.SHRINK_DOMAIN })

    const domain = PRIMES.slice(0, standardDomainPrimeCount)
    const finalDomainKey = domain.length - 1
    const domainElements = domain.map((domainElement, key) => {
        return <div className="domain-element" key={key}>
            <div>{domainElement}</div>
            {key === finalDomainKey ? <button onClick={handleMinus}>-</button> : ""}
        </div>
    })
    
    const mapppingElements = mapping.map((mappingRow, key) => {
        const mappingRowElements = mappingRow.map((mappingElement, key) => {
            return <div className="mapping-element" key={key}>{mappingElement}</div>
        })
        return <div className="mapping-row" key={key}>{mappingRowElements}</div>
    })

    return <div className="container">
        <div className="domain">
            {domainElements}
            <button onClick={handlePlus}>+</button>
        </div>
        <div className="aligned-with-domain">{"aligned with domain"}</div>
        <div className="mapping">
            {mapppingElements}
        </div>
    </div>
}

export {
    App,
}
