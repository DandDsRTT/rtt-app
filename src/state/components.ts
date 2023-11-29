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
    while (state.commaBasis[0].length > newCommaBasis[0].length) state.commaBasis.map(_ => _.pop())
}

const updateMapping = (state: ObjectState, newMapping: number[][]) => {
    newMapping.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            state.mapping[rowIndex] ||= []
            state.mapping[rowIndex][columnIndex] = cell
        })
    })
    while (state.mapping.length > newMapping.length) state.mapping.pop()
    while (state.mapping[0].length > newMapping[0].length) state.mapping.map(_ => _.pop())
}

const updateDomain = (view: View, dimensionality: number) => {
    view.cols[COLS.DOMAIN_PRIMES].subColumns.length = 0
    for (let i = 0; i < dimensionality; i++) {
        view.cols[COLS.DOMAIN_PRIMES].subColumns.push({type: "gridded", index: i, gridColumn: 0})
    }
    view.cols[COLS.DOMAIN_PRIMES].subColumns.push({type: "name", gridColumn: 0})
    view.cols[COLS.DOMAIN_PRIMES].subColumns.push({type: "plus", gridColumn: 0})

    view.rows[ROWS.INTERVALS].subRows.length = 0
    for (let i = 0; i < dimensionality; i++) {
        view.rows[ROWS.INTERVALS].subRows.push({type: "gridded", index: i, gridRow: 0})
    }
    view.rows[ROWS.INTERVALS].subRows.push({type: "name", gridRow: 0})
    view.rows[ROWS.INTERVALS].subRows.push({type: "plus", gridRow: 0})
}

// TODO: refactor state so there's just the minimal representation of tuning and temperament state, 
//  and the view state is completely separate and generated as a result of that, 
//  and then the components read the view state and make it into the interactive app
//  and perhaps the animating in of new components could be handled along with previewing new items that will appear 
//  if you click a button or change a field / highlighting things that are going to change

const updateRank = (view: View, rank: number) => {
    view.cols[COLS.GENERATORS].subColumns.length = 0
    for (let i = 0; i < rank; i++) {
        view.cols[COLS.GENERATORS].subColumns.push({type: "gridded", index: i, gridColumn: 0})
    }
    view.cols[COLS.GENERATORS].subColumns.push({type: "name", gridColumn: 0})
    view.cols[COLS.GENERATORS].subColumns.push({type: "plus", gridColumn: 0})

    view.rows[ROWS.MAPPING].subRows.length = 0
    for (let i = 0; i < rank; i++) {
        view.rows[ROWS.MAPPING].subRows.push({type: "gridded", index: i, gridRow: 0})
    }
    view.rows[ROWS.MAPPING].subRows.push({type: "name", gridRow: 0})
    view.rows[ROWS.MAPPING].subRows.push({type: "plus", gridRow: 0})
}

export {
    updateDomain,
    updateMapping,
    updateCommaBasis,
    updateRank,
}
