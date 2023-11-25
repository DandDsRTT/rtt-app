import {configureStore, Store} from "@reduxjs/toolkit";
import {reducer} from "../src/state/rootReducer";
import React, {PropsWithChildren} from "react";
import {Provider} from "react-redux";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {App} from "../src/components/App";
import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {default as axios} from 'axios'

jest.mock("axios");

export const renderWithProviders = (ui: React.ReactElement, {store}: { store: Store }) => ({
    store,
    ...render(ui, {wrapper: ({children}: PropsWithChildren<{}>) => <Provider store={store}>{children}</Provider>})
})

let store: Store

describe("integration test", () => {
    beforeEach(() => {
        store = configureStore({reducer})
        renderWithProviders(<App/>, {store})
    })

    describe("expanding the domain", () => {
        const expandDomain = async () => {
            (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({data: "MatrixForm[{{1, 1, 0, 0}, {0, 1, 4, 0}, {0, 0, 0, 1}}]"}));
            fireEvent.click(screen.getByRole('button', {name: "+"}))
            await waitFor(() => expect(screen.queryByText('loading...')).not.toBeTruthy());
        }

        test("it expands the domain", async() => {
            expect(getDomainValues()).toEqual([2, 3, 5])
            await expandDomain()
            expect(getDomainValues()).toEqual([2, 3, 5, 7])
        })

        test("it expands the mapping", async() => {
            expect(getMappingValues()).toEqual([[1, 1, 0], [0, 1, 4]])
            await expandDomain()
            expect(getMappingValues()).toEqual([[1, 1, 0, 0], [0, 1, 4, 0], [0, 0, 0, 1]])
        })

        test("it expands the comma basis", async() => {
            expect(getCommaBasisValues()).toEqual([[-4, 4, -1]])
            await expandDomain()
            expect(getCommaBasisValues()).toEqual([[-4, 4, -1, 0]])
        })
    })

    describe("shrinking the domain", () => {
        const shrinkDomain = async () => {
            (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({data: "MatrixForm[{{1, 1}}]"}));
            fireEvent.click(screen.getAllByRole('button', {name: "-"})[0])
            await waitFor(() => expect(screen.queryByText('loading...')).not.toBeTruthy());
        }

        test("it shrinks the domain", async () => {
            expect(getDomainValues()).toEqual([2, 3, 5])
            await shrinkDomain()
            expect(getDomainValues()).toEqual([2, 3])
        })

        test("it shrinks the mapping", async () => {
            expect(getMappingValues()).toEqual([[1, 1, 0], [0, 1, 4]])
            await shrinkDomain()
            expect(getMappingValues()).toEqual([[1, 1]])
        })

        test("it shrinks the comma basis", async () => {
            expect(getCommaBasisValues()).toEqual([[-4, 4, -1]])
            await shrinkDomain()
            expect(getCommaBasisValues()).toEqual([[-4, 4]])
        })
    })

    describe("changing the mapping", () => {
        const changeMapping = async () => {
            (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({data: "MatrixForm[{{-5}, {5}, {1}}]"}));
            fireEvent.change(screen.getByTitle("mapping-cell-row-1-column-2"), {target: {value: '5'}})
            await waitFor(() => expect(screen.queryByText('loading...')).not.toBeTruthy());
        }

        test("it updates the comma basis", async () => {
            expect(getCommaBasisValues()).toEqual([[-4, 4, -1]])
            await changeMapping()
            expect(getCommaBasisValues()).toEqual([[-5, 5, 1]])
        })
    })

    describe("changing the comma basis", () => {
        const changeCommaBasis = async () => {
            (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({data: "MatrixForm[{{1, 0, -4}, {0, 1, 5}}]"}));
            fireEvent.change(screen.getByTitle("comma-basis-cell-column-0-row-1"), {target: {value: '-5'}})
            await waitFor(() => expect(screen.queryByText('loading...')).not.toBeTruthy());
        }

        test("it updates the mapping", async () => {
            expect(getMappingValues()).toEqual([[1, 1, 0], [0, 1, 4]])
            await changeCommaBasis()
            expect(getMappingValues()).toEqual([[1, 0, -4], [0, 1, 5]])
        })
    })
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
