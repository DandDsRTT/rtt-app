import React from "react";
import { SubCol, SubRow } from "../state/view/types";
import { Dispatch } from "@reduxjs/toolkit";

interface ElementProps {
    subRow: SubRow,
    subCol: SubCol,
    dispatch?: Dispatch,
    matrix?: number[][],
    dimensionality?: number,
    loading?: boolean,
}

type Handler<ElementType> = (handlerParameters: HandlerParameters<ElementType>) => void

interface HandlerParameters<ElementType> {
    dispatch: Dispatch,
    matrix: number[][],
    element: React.ChangeEvent<ElementType>,
    address: number[],
    dimensionality: number,
}

export {
    HandlerParameters,
    Handler,
    ElementProps,
}
