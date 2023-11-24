import {SubCol, SubRow} from "../state/types";
import {Dispatch} from "@reduxjs/toolkit";

interface ElementProps {
    subrow: SubRow,
    subcol: SubCol,
    key: string,
    dispatch?: Dispatch,
    matrix?: number[][],
}

export {
    ElementProps,
}
