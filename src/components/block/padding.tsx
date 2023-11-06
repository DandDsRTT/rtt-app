import React from "react"

const cornerPadding = (gridRow: number, gridCo: number, key: string) => (
    <div
        key={key}
        className="corner-padding"
        style={{
            gridRow: gridRow,
            gridColumn: gridCo,
        }}
    >
    </div>
)

const verticalPadding = (gridRow: number, gridCo: number, key: string) => (
    <div
        key={key}
        className="vertical-padding"
        style={{
            gridRow: gridRow,
            gridColumn: gridCo,
        }}
    >
    </div>
)

const horizontalPadding = (gridRow: number, gridCo: number, key: string) => (
    <div
        key={key}
        className="horizontal-padding"
        style={{
            gridRow: gridRow,
            gridColumn: gridCo,
        }}
    >
    </div>
)

export {
    cornerPadding,
    verticalPadding,
    horizontalPadding,
}
