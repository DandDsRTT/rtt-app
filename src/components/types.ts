import React from "react";
import {SubColumn, SubRow} from "../state/types";
import {Dispatch} from "@reduxjs/toolkit";

interface ElementProps {
    subRow: SubRow,
    subColumn: SubColumn,
    dispatch?: Dispatch,
    matrix?: number[][],
    dimensionality?: number,
}

type Handler<ElementType> = (handlerParameters: HandlerParameters<ElementType>) => void

interface HandlerParameters<ElementType> {
    dispatch: Dispatch,
    matrix: number[][],
    element: React.ChangeEvent<ElementType>,
    address: number[],
}

export {
    HandlerParameters,
    Handler,
    ElementProps,
}
