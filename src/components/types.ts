import {SubColumn, SubRow} from "../state/types";
import {Dispatch} from "@reduxjs/toolkit";

interface ElementProps {
    subRow: SubRow,
    subColumn: SubColumn,
    key: string,
    dispatch?: Dispatch,
    matrix?: number[][],
}

export {
    ElementProps,
}
