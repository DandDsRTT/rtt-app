import {Column, Row} from "../../state/types";
import {ElementProps} from "../types";
import React from "react";
import {Dispatch} from "@reduxjs/toolkit";

interface BlockProps {
    row: Row,
    column: Column,
    Element?: (elementProps: ElementProps) => React.JSX.Element,
    dispatch?: Dispatch,
    matrix?: number[][],
    dimensionality?: number,
}

export {
    BlockProps,
}
