import {useDispatch, useSelector} from "react-redux";
import {ObjectState} from "../../types";
import React from "react";
import {handleCommaBasisElementChange} from "./handlers";
import "./styles.scss"

const CommaBasis = () => {
    const {commaBasis} = useSelector(({commaBasis}: ObjectState) => ({commaBasis}))
    const dispatch = useDispatch()

    const commaBasisElements = commaBasis.map((comma, colIndex) => {
        const commaElements = comma.map((commaElement, rowIndex) => {
            return <input
                className="square-input"
                key={[colIndex, rowIndex].join(",")}
                value={commaElement}
                onChange={input => handleCommaBasisElementChange(dispatch, commaBasis, input, [colIndex, rowIndex])}
            />
        })
        return <div className="comma" key={colIndex}>{commaElements}</div>
    })

    return (
        <div className="comma-basis">
            {commaBasisElements}
        </div>
    )
}

export {
    CommaBasis,
}