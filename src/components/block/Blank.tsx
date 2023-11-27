import React from "react"
import {BlankTypeProps, AddressProps} from "./types";

const blankBuilder = (className: string) => (addressProps: AddressProps) => <BlankType {...{...addressProps, className}}/>

const Blank = blankBuilder("blank")

const BlankType = ({gridRow, gridColumn, gridLineHorizontal, gridLineVertical, className}: BlankTypeProps): React.JSX.Element =>  (
    <div
        className={className}
        style={{gridRow, gridColumn}}
    >
        {gridLineHorizontal && <div className="grid-line-horizontal"></div>}
        {gridLineVertical && <div className="grid-line-vertical"></div>}
    </div>
)

export {
    Blank,
    blankBuilder,
}
