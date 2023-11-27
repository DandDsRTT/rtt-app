import {configureStore, Store} from "@reduxjs/toolkit";
import {reducer} from "../src/state/rootReducer";
import React from "react";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import {App} from "../src/components/App";
import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {default as axios} from 'axios'
import {getCommaBasisValues, getDomainValues, getMappingValues, renderWithProviders} from "./helpers";
import {changeCommaBasis, changeMapping} from "./actions";

jest.mock("axios");

describe("integration test", () => {
    let store: Store

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

        test("it expands the domain", async () => {
            expect(getDomainValues()).toEqual([2, 3, 5])
            await expandDomain()
            expect(getDomainValues()).toEqual([2, 3, 5, 7])
        })

        test("it expands the mapping", async () => {
            expect(getMappingValues()).toEqual([[1, 1, 0], [0, 1, 4]])
            await expandDomain()
            expect(getMappingValues()).toEqual([[1, 1, 0, 0], [0, 1, 4, 0], [0, 0, 0, 1]])
        })

        test("it expands the comma basis", async () => {
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
        test("it updates the comma basis", async () => {
            expect(getCommaBasisValues()).toEqual([[-4, 4, -1]])
            await changeMapping()
            expect(getCommaBasisValues()).toEqual([[-5, 5, 1]])
        })
    })

    describe("changing the comma basis", () => {
        test("it updates the mapping", async () => {
            expect(getMappingValues()).toEqual([[1, 1, 0], [0, 1, 4]])
            await changeCommaBasis()
            expect(getMappingValues()).toEqual([[1, 0, -4], [0, 1, 5]])
        })
    })

    describe('undoing', () => {
        const undo = async () => {
            fireEvent.click(screen.getByRole('button', {name: "undo"}))
        }

        test("it can undo the latest action", async () => {
            const originalMapping = [[1, 1, 0], [0, 1, 4]]
            expect(getMappingValues()).toEqual(originalMapping)
            await changeMapping()
            expect(getMappingValues()).not.toEqual(originalMapping)
            await undo()
            expect(getMappingValues()).toEqual(originalMapping)

            const originalCommaBasis = [[-4, 4, -1]]
            expect(getCommaBasisValues()).toEqual(originalCommaBasis)
            await changeCommaBasis()
            expect(getCommaBasisValues()).not.toEqual(originalCommaBasis)
            await undo()
            expect(getCommaBasisValues()).toEqual(originalCommaBasis)
        })
    });

    test("the app doesn't crash when a cell value is temporarily invalid while you're working on it", async () => {
        expect(getCommaBasisValues()).toEqual([[-4, 4, -1]])
        fireEvent.change(screen.getByTestId("comma-basis-cell-column-0-row-0"), {target: {value: '-'}})
        expect(getCommaBasisValues()).toEqual([["-", 4, -1]])
        fireEvent.change(screen.getByTestId("comma-basis-cell-column-0-row-0"), {target: {value: '-3'}})
        await waitFor(() => expect(screen.queryByText('loading...')).not.toBeTruthy());
        expect(getCommaBasisValues()).toEqual([[-3, 4, -1]])
    })
})
