import {Col, Row} from "../../state/types";
import {ElementProps} from "../types";
import React from "react";
import {Dispatch} from "@reduxjs/toolkit";

interface BlockProps {
    row: Row,
    col: Col,
    elementFunction: ({subrow, subcol, key, dispatch, matrix}: ElementProps) => React.JSX.Element,
    dispatch?: Dispatch,
    matrix?: number[][];
}

export {
    BlockProps,
}
