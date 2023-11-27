import {initialState} from "./initialState"
import {createReducer, current} from "@reduxjs/toolkit"
import {COLS, ROWS} from "../constants"
import {
    ChangeCommaBasisAction,
    ChangeMappingAction,
    ExpandDomainAction,
    ObjectState,
    ShrinkDomainAction,
    View
} from "./types"

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase("expandDomain", (state, action: ExpandDomainAction) => {
            state.dimensionality = state.dimensionality + 1
            state.rank = state.rank + 1
            updateCommaBasis(state, action.commaBasis)
            updateDomain(state.view, state.dimensionality)
            updateRank(state.view, state.rank)
            updateGrid(state.view)
        })
        .addCase("shrinkDomain", (state, action: ShrinkDomainAction) => {
            state.dimensionality = state.dimensionality - 1
            state.rank = state.rank - 1
            updateCommaBasis(state, action.commaBasis)
            updateDomain(state.view, state.dimensionality)
            updateRank(state.view, state.rank)
            updateGrid(state.view)
        })
        .addCase("changeMapping", (state, action: ChangeMappingAction) => {
            updateMapping(state, action.mapping)
            updateDomain(state.view, state.dimensionality)
            updateRank(state.view, state.rank)
            updateGrid(state.view)
        })
        .addCase("changeCommaBasis", (state, action: ChangeCommaBasisAction) => {
            updateCommaBasis(state, action.commaBasis)
            updateDomain(state.view, state.dimensionality)
            updateRank(state.view, state.rank)
            updateGrid(state.view)
        })
        .addCase("initializeGrid", (state) => {
            updateGrid(state.view)
        })
        .addCase("snapshot", (state) => {
            const {snapshots, ...toBeSnapshot} = state
            state.snapshots.push(toBeSnapshot)
        })
        .addCase("undo", (state) => {
            const mostRecentSnapshot = state.snapshots.pop()
            mergeDeep(state, JSON.parse(JSON.stringify(current(mostRecentSnapshot))))
            updateGrid(state.view)
        })
})

const isObject = (item: unknown) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

const mergeDeep = (target: any, ...sources: any[]): any => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

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

const updateGrid = (view: View) => {
    let gridRow = 0
    view.rows.forEach(row => {
        if (row.subRows[0].type !== "padding") {
            row.subRows.unshift({
                type: "padding",
                side: "top",
                gridRow: 0,
            })
            row.subRows.push({
                type: "padding",
                side: "bottom",
                gridRow: 0,
            })
            row.subRows.push({
                type: "margin",
                side: "vertical",
                gridRow: 0,
            })
        }

        row.subRows.forEach(subRow => {
            subRow.gridRow = gridRow
            gridRow++
        })
    })

    let gridColumn = 0
    view.cols.forEach(column => {
        if (column.subColumns[0].type !== "padding") {
            column.subColumns.unshift({
                type: "padding",
                side: "left",
                gridColumn: 0,
            })
            column.subColumns.push({
                type: "padding",
                side: "right",
                gridColumn: 0,
            })
            column.subColumns.push({
                type: "margin",
                side: "horizontal",
                gridColumn: 0,
            })
        }

        column.subColumns.forEach(subColumn => {
            subColumn.gridColumn = gridColumn
            gridColumn++
        })
    })
    
    return view
}

export {
    reducer,
}
