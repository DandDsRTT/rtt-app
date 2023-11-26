import {Dispatch} from "@reduxjs/toolkit";

type DomainHandler = (domainHandlerParameters: DomainHandlerParameters) => void

interface DomainHandlerParameters {
    dispatch: Dispatch,
    matrix: number[][],
    dimensionality?: number,
}

export {
    DomainHandler,
    DomainHandlerParameters,
}
