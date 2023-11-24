import React from "react"

const CornerPadding = ({gridRow, gridColumn, key}: { gridRow: number, gridColumn: number, key: string }) => (
    <div
        key={key}
        className="corner-padding"
        style={{
            gridRow,
            gridColumn,
        }}
    >
    </div>
)

const VerticalPadding = ({gridRow, gridColumn, key}: { gridRow: number, gridColumn: number, key: string }) => (
    <div
        key={key}
        className="vertical-padding"
        style={{
            gridRow,
            gridColumn,
        }}
    >
    </div>
)

const HorizontalPadding = ({gridRow, gridColumn, key}: { gridRow: number, gridColumn: number, key: string }) => (
    <div
        key={key}
        className="horizontal-padding"
        style={{
            gridRow,
            gridColumn,
        }}
    >
    </div>
)

export {
    CornerPadding,
    VerticalPadding,
    HorizontalPadding,
}
