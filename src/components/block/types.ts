import { Col, Row } from "../../state/view/types";
import { ElementProps } from "../types";
import React from "react";
import { Dispatch } from "@reduxjs/toolkit";

interface BlockProps {
    row: Row,
    col: Col,
    Element?: (elementProps: ElementProps) => React.JSX.Element,
    dispatch?: Dispatch,
    matrix?: number[][],
    loading?: boolean,
    dimensionality?: number,
    rank?: number,
}

interface BlankTypeProps extends AddressProps {
    className: string,
}

interface AddressProps {
    gridRow: number,
    gridColumn: number,
    gridLineHorizontal?: boolean,
    gridLineVertical?: boolean,
}

export {
    BlockProps,
    BlankTypeProps,
    AddressProps,
}
