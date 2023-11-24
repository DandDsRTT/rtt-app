import React from "react"

const cornerMargin = (gridRow: number, gridCo: number, key: string) => (
    <div
        key={key}
        className="corner-margin"
        style={{
            gridRow: gridRow,
            gridColumn: gridCo,
        }}
    >
    </div>
)

const verticalMargin = (gridRow: number, gridCo: number, key: string) => (
    <div
        key={key}
        className="vertical-margin"
        style={{
            gridRow: gridRow,
            gridColumn: gridCo,
        }}
    >
    </div>
)

const horizontalMargin = (gridRow: number, gridCo: number, key: string) => (
    <div
        key={key}
        className="horizontal-margin"
        style={{
            gridRow: gridRow,
            gridColumn: gridCo,
        }}
    >
    </div>
)

export {
    cornerMargin,
    verticalMargin,
    horizontalMargin,
}
