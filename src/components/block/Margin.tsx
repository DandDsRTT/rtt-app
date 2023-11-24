import React from "react"

const CornerMargin = ({gridRow, gridColumn, key}: { gridRow: number, gridColumn: number, key: string }): React.JSX.Element => (
    <div
        key={key}
        className="corner-margin"
        style={{
            gridRow,
            gridColumn,
        }}
    >
    </div>
)

const VerticalMargin = ({gridRow, gridColumn, key}: { gridRow: number, gridColumn: number, key: string }): React.JSX.Element => (
    <div
        key={key}
        className="vertical-margin"
        style={{
            gridRow,
            gridColumn,
        }}
    >
    </div>
)

const HorizontalMargin = ({gridRow, gridColumn, key}: { gridRow: number, gridColumn: number, key: string }): React.JSX.Element => (
    <div
        key={key}
        className="horizontal-margin"
        style={{
            gridRow,
            gridColumn,
        }}
    >
    </div>
)

export {
    CornerMargin,
    VerticalMargin,
    HorizontalMargin,
}
