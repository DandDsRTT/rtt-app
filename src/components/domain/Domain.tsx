import {handleMinus, handlePlus} from "./handlers";
import React from "react";
import {PRIMES} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {ObjectState} from "../../types";
import "./styles.scss"

const Domain = () => {
    const {dimensionality} = useSelector(({dimensionality}: ObjectState) => ({dimensionality}))
    const dispatch = useDispatch()

    const domain = PRIMES.slice(0, dimensionality)
    const finalDomainKey = domain.length - 1
    const domainElements = domain.map((domainElement, key) => {
        return <div className="square-input" key={key}>
            <div>{domainElement}</div>
            {key === finalDomainKey ? <button onClick={() => handleMinus(dispatch)}>-</button> : ""}
        </div>
    })

    return (
        <div className="domain">
            {domainElements}
            <button onClick={() => handlePlus(dispatch)}>+</button>
        </div>
    )
}

export {
    Domain,
}
