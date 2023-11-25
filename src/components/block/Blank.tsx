import React from "react"

const Blank = ({gridRow, gridColumn}: {gridRow: number, gridColumn: number}): React.JSX.Element =>  (
    <div 
        className="blank"
        style={{
            gridRow,
            gridColumn
        }}
    >
    </div>
)

export {
    Blank,
}
