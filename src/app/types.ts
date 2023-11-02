import { Action } from "redux"

interface MyAction extends Action {
    data: any;
}

interface MyState {
    standardDomainPrimeCount: number,
    mapping: number[][],
}

export {
    MyAction,
    MyState
}
