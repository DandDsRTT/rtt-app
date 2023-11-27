import {ObjectState, View} from "./types";
import {COLS, ROWS} from "../constants";

const updateCommaBasis = (state: ObjectState, newCommaBasis: number[][]) => {
    newCommaBasis.forEach((column, columnIndex) => {
        column.forEach((cell, rowIndex) => {
            state.commaBasis[columnIndex] ||= []
            state.commaBasis[columnIndex][rowIndex] = cell
        })
    })
    while (state.commaBasis.length > newCommaBasis.length) state.commaBasis.pop()
    while (state.commaBasis[0].length > newCommaBasis[0].length) state.commaBasis.map(comma => {
        comma.pop()
        return comma
    })
}

const updateMapping = (state: ObjectState, newMapping: number[][]) => {
    newMapping.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            state.mapping[rowIndex] ||= []
            state.mapping[rowIndex][columnIndex] = cell
        })
    })
    while (state.mapping.length > newMapping.length) state.mapping.pop()
    while (state.mapping[0].length > newMapping[0].length) state.mapping.map(comma => {
        comma.pop()
        return comma
    })
}

const updateDomain = (view: View, dimensionality: number) => {
    view.cols[COLS.DOMAIN_PRIMES].subColumns.length = 0
    for (let i = 0; i < dimensionality; i++) {
        view.cols[COLS.DOMAIN_PRIMES].subColumns.push({type: "gridded", index: i, gridColumn: 0})
    }
    view.cols[COLS.DOMAIN_PRIMES].subColumns.push({type: "plus", gridColumn: 0})

    view.rows[ROWS.INTERVALS].subRows.length = 0
    for (let i = 0; i < dimensionality; i++) {
        view.rows[ROWS.INTERVALS].subRows.push({type: "gridded", index: i, gridRow: 0})
    }
    view.rows[ROWS.INTERVALS].subRows.push({type: "plus", gridRow: 0})
}

const updateRank = (view: View, rank: number) => {
    view.cols[COLS.GENERATORS].subColumns.length = 0
    for (let i = 0; i < rank; i++) {
        view.cols[COLS.GENERATORS].subColumns.push({type: "gridded", index: i, gridColumn: 0})
    }
    view.cols[COLS.GENERATORS].subColumns.push({type: "plus", gridColumn: 0})

    view.rows[ROWS.MAPPING].subRows.length = 0
    for (let i = 0; i < rank; i++) {
        view.rows[ROWS.MAPPING].subRows.push({type: "gridded", index: i, gridRow: 0})
    }
    view.rows[ROWS.MAPPING].subRows.push({type: "plus", gridRow: 0})
}

export {
    updateDomain,
    updateMapping,
    updateCommaBasis,
    updateRank,
}