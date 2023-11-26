import {render, screen} from "@testing-library/react";
import React, {PropsWithChildren} from "react";
import {Store} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

const renderWithProviders = (ui: React.ReactElement, {store}: { store: Store }) => ({
    store,
    ...render(ui, {wrapper: ({children}: PropsWithChildren<{}>) => <Provider store={store}>{children}</Provider>})
    })

const getDomainValues = (): number[] => (screen.getAllByTitle(/domain-cell-\d+/) as HTMLInputElement[])
    .map((domainCell: HTMLInputElement) => parseInt(domainCell.value))

const getMappingValues = (): number[][] => {
    const mappingCells: HTMLInputElement[] = screen.getAllByTitle(/mapping-cell-row-\d+-column-\d+/)
    const mappingValues = []
    let currentMappingRowValues: number[] = []
    let currentMappingRowIndex = 0
    for (const mappingCell of mappingCells) {
        const [mappingRowIndex, mappingColumnIndex] = mappingCell.title.match(/(\d+)/g)!.map(parseInt)
        if (mappingRowIndex > currentMappingRowIndex) {
            mappingValues.push(currentMappingRowValues)
            currentMappingRowValues = []
            currentMappingRowIndex++
        }
        currentMappingRowValues.push(parseInt(mappingCell.value))
    }
    mappingValues.push(currentMappingRowValues)

    return mappingValues
}

const getCommaBasisValues = (): number[][] => {
    const commaBasisCells: HTMLInputElement[] = screen.getAllByTitle(/comma-basis-cell-column-\d+-row-\d+/)
    const commaBasisValues = []
    let currentCommaBasisCol: number[] = []
    let currentCommaBasisColIndex = 0
    for (const commaBasisCell of commaBasisCells) {
        const [commaBasisColIndex, mappingColumnIndex] = commaBasisCell.title.match(/(\d+)/g)!.map(parseInt)
        if (commaBasisColIndex > currentCommaBasisColIndex) {
            commaBasisValues.push(currentCommaBasisCol)
            currentCommaBasisCol = []
            currentCommaBasisColIndex++
        }
        currentCommaBasisCol.push(parseInt(commaBasisCell.value))
    }
    commaBasisValues.push(currentCommaBasisCol)

    return commaBasisValues
}

export {
    renderWithProviders,
    getDomainValues,
    getMappingValues,
    getCommaBasisValues,
}