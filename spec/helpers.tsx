import {render, screen} from "@testing-library/react";
import React, {PropsWithChildren} from "react";
import {Store} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

const renderWithProviders = (ui: React.ReactElement, {store}: { store: Store }) => ({
    store,
    ...render(ui, {wrapper: ({children}: PropsWithChildren<{}>) => <Provider store={store}>{children}</Provider>})
})

const getDomainValues = (): number[] => (screen.getAllByTestId(/domain-cell-\d+/) as HTMLInputElement[])
    .map((domainCell: HTMLInputElement) => parseInt(domainCell.value))

const getMappingValues = (): (string | number)[][] => {
    const mappingCells: HTMLInputElement[] = screen.getAllByTestId(/mapping-cell-row-\d+-column-\d+/)
    const mappingValues = []
    let currentMappingRowValues: (string | number)[] = []
    let currentMappingRowIndex = 0
    for (const mappingCell of mappingCells) {
        const [mappingRowIndex, mappingColumnIndex] = mappingCell.getAttribute("data-testid")!.match(/(\d+)/g)!.map(parseInt)
        if (mappingRowIndex > currentMappingRowIndex) {
            mappingValues.push(currentMappingRowValues)
            currentMappingRowValues = []
            currentMappingRowIndex++
        }
        const cellValue = parseInt(mappingCell.value);
        currentMappingRowValues.push(isNaN(cellValue) ? mappingCell.value : cellValue)
    }
    mappingValues.push(currentMappingRowValues)

    return mappingValues
}

const getCommaBasisValues = (): (string | number)[][] => {
    const commaBasisCells: HTMLInputElement[] = screen.getAllByTestId(/comma-basis-cell-column-\d+-row-\d+/)
    const commaBasisValues = []
    let currentCommaBasisCol: (string | number)[] = []
    let currentCommaBasisColIndex = 0
    for (const commaBasisCell of commaBasisCells) {
        const [commaBasisColIndex, mappingColumnIndex] = commaBasisCell.getAttribute("data-testid")!.match(/(\d+)/g)!.map(parseInt)
        if (commaBasisColIndex > currentCommaBasisColIndex) {
            commaBasisValues.push(currentCommaBasisCol)
            currentCommaBasisCol = []
            currentCommaBasisColIndex++
        }
        const cellValue = parseInt(commaBasisCell.value);
        currentCommaBasisCol.push(isNaN(cellValue) ? commaBasisCell.value : cellValue)
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