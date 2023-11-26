import React from "react"
import {BlankTypeProps, AddressProps} from "./types";

const blankBuilder = (className: string) => (addressProps: AddressProps) => <BlankType {...{...addressProps, className}}/>

const Blank = blankBuilder("blank")

const BlankType = ({gridRow, gridColumn, className}: BlankTypeProps): React.JSX.Element =>  (
    <div
        className={className}
        style={{gridRow, gridColumn}}
    >
    </div>
)

export {
    Blank,
    blankBuilder,
}
