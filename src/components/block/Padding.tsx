import React from "react"

const CornerPadding = ({gridRow, gridColumn}: { gridRow: number, gridColumn: number }) => (
    <div
        className="corner-padding"
        style={{gridRow, gridColumn}}
    >
    </div>
)

const VerticalPadding = ({gridRow, gridColumn}: { gridRow: number, gridColumn: number }) => (
    <div
        className="vertical-padding"
        style={{gridRow, gridColumn}}
    >
    </div>
)

const HorizontalPadding = ({gridRow, gridColumn}: { gridRow: number, gridColumn: number }) => (
    <div
        className="horizontal-padding"
        style={{gridRow, gridColumn}}
    >
    </div>
)

export {
    CornerPadding,
    VerticalPadding,
    HorizontalPadding,
}
