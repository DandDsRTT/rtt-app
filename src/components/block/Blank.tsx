import React from "react"

const blank = (gridRow: number, gridCo: number, key: string) =>  (
    <div 
        key={key} 
        className="blank"
        style={{
            gridRow: gridRow,
            gridColumn: gridCo
        }}
    >
    </div>
)

export {
    blank,
}
