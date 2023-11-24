import React from "react"

const Blank = ({gridRow, gridColumn, key}: {gridRow: number, gridColumn: number, key: string}): React.JSX.Element =>  (
    <div 
        key={key} 
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
