import React from "react"

const CornerMargin = ({gridRow, gridColumn}: { gridRow: number, gridColumn: number }): React.JSX.Element => (
    <div
        className="corner-margin"
        style={{gridRow, gridColumn}}
    >
    </div>
)

const VerticalMargin = ({gridRow, gridColumn}: { gridRow: number, gridColumn: number }): React.JSX.Element => (
    <div
        className="vertical-margin"
        style={{gridRow, gridColumn}}
    >
    </div>
)

const HorizontalMargin = ({gridRow, gridColumn}: { gridRow: number, gridColumn: number }): React.JSX.Element => (
    <div
        className="horizontal-margin"
        style={{gridRow, gridColumn}}
    >
    </div>
)

export {
    CornerMargin,
    VerticalMargin,
    HorizontalMargin,
}
