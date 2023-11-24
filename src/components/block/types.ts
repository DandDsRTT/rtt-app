import {Column, Row} from "../../state/types";
import {ElementProps} from "../types";
import React from "react";
import {Dispatch} from "@reduxjs/toolkit";

interface BlockProps {
    row: Row,
    col: Column,
    Element?: (elementProps: ElementProps) => React.JSX.Element,
    dispatch?: Dispatch,
    matrix?: number[][];
}

export {
    BlockProps,
}
