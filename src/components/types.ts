import React from "react";
import {SubColumn, SubRow} from "../state/view/types";
import {Dispatch} from "@reduxjs/toolkit";

interface ElementProps {
    subRow: SubRow,
    subColumn: SubColumn,
    dispatch?: Dispatch,
    matrix?: number[][],
    dimensionality?: number,
    rank?: number,
    loading?: boolean,
}

type Handler<ElementType> = (handlerParameters: HandlerParameters<ElementType>) => void

interface HandlerParameters<ElementType> {
    dispatch: Dispatch,
    matrix: number[][],
    element: React.ChangeEvent<ElementType>,
    address: number[],
    rank: number,
    dimensionality: number,
}

export {
    HandlerParameters,
    Handler,
    ElementProps,
}
