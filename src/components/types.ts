import {SubColumn, SubRow} from "../state/types";
import {Dispatch} from "@reduxjs/toolkit";

interface ElementProps {
    subRow: SubRow,
    subColumn: SubColumn,
    dispatch?: Dispatch,
    matrix?: number[][],
}

export {
    ElementProps,
}
