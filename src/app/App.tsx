import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { MyState } from "./types"
import { PRIMES } from "./constants"
import axios from "axios"
import { convertCommaBasisToEbk, convertMappingToEbk, transposeArray } from "./utilities"

const HOST = "https://rtt-api-server.onrender.com/"

const App = () => {
    const {
        standardDomainPrimeCount,
        mapping,
        commaBasis
    } = useSelector((state: MyState) => {
        return {
            standardDomainPrimeCount: state.standardDomainPrimeCount,
            mapping: state.mapping,
            commaBasis: state.commaBasis,
        }
    })
    const dispatch = useDispatch()
    const handlePlus = () => dispatch({ type: "expandDomain" })
    const handleMinus = () => dispatch({ type: "shrinkDomain" })

    const handleMappingElementChange = (input: React.ChangeEvent<HTMLInputElement>, mappingAddress: number[]) => {
        const [ rowIndex, colIndex ] = mappingAddress
        const newMapping = JSON.parse(JSON.stringify(mapping))
        newMapping[ rowIndex ][ colIndex ] = parseInt(input.target.value)
        dispatch({ type: "changeMapping", data: newMapping })

        axios.get(
            HOST + encodeURI("dual?unparsedT=" + convertMappingToEbk(newMapping)),
            {},
        ).then(response => {
            let unparsedCommaBasis = response.data.replace("MatrixForm[", "")
                .replace("]", "")
                .replaceAll("{", "[")
                .replaceAll("}", "]")
            unparsedCommaBasis = JSON.parse(unparsedCommaBasis)
            unparsedCommaBasis = transposeArray(unparsedCommaBasis)
            dispatch({ type: "changeCommaBasis", data: unparsedCommaBasis })
        }).catch(e => {
            console.error("axios error: ", e)
        })
    }
    
    const handleCommaBasisElementChange = (input: React.ChangeEvent<HTMLInputElement>, commaBasisAddress: number[]) => {
        const [ colIndex, rowIndex ] = commaBasisAddress
        const newCommaBasis = JSON.parse(JSON.stringify(commaBasis))
        newCommaBasis[ colIndex ][ rowIndex ] = parseInt(input.target.value)
        dispatch({ type: "changeCommaBasis", data: newCommaBasis })

        axios.get(
            HOST + encodeURI("dual?unparsedT=" + convertCommaBasisToEbk(newCommaBasis)),
            {},
        ).then(response => {
            let unparsedMapping = response.data.replace("MatrixForm[", "")
                .replace("]", "")
                .replaceAll("{", "[")
                .replaceAll("}", "]")
            unparsedMapping = JSON.parse(unparsedMapping)
            dispatch({ type: "changeMapping", data: unparsedMapping })
        }).catch(e => {
            console.error("axios error: ", e)
        })
    }

    const domain = PRIMES.slice(0, standardDomainPrimeCount)
    const finalDomainKey = domain.length - 1
    const domainElements = domain.map((domainElement, key) => {
        return <div className="domain-element" key={key}>
            <div>{domainElement}</div>
            {key === finalDomainKey ? <button onClick={handleMinus}>-</button> : ""}
        </div>
    })

    const mappingElements = mapping.map((mappingRow, rowIndex) => {
        const mappingRowElements = mappingRow.map((mappingElement, colIndex) => {
            return <input
                className="mapping-element"
                key={[rowIndex, colIndex].join(",")}
                value={mappingElement}
                onChange={input => handleMappingElementChange(input, [rowIndex, colIndex])}
            />
        })
        return <div className="mapping-row" key={rowIndex}>{mappingRowElements}</div>
    })

    const commaBasisElements = commaBasis.map((comma, colIndex) => {
        const commaElements = comma.map((commaElement, rowIndex) => {
            return <input
                className="comma-basis-element"
                key={[colIndex, rowIndex].join(",")}
                value={commaElement}
                onChange={input => handleCommaBasisElementChange(input, [colIndex, rowIndex])}
            />
        })
        return <div className="comma" key={colIndex}>{commaElements}</div>
    })

    return <div className="container">
        <div className="domain">
            {domainElements}
            <button onClick={handlePlus}>+</button>
        </div>
        <div className="aligned-with-domain">{"aligned with domain"}</div>
        <div className="mapping">
            {mappingElements}
        </div>
        <div className="comma-basis">
            {commaBasisElements}
        </div>
    </div>
}

export {
    App,
}
