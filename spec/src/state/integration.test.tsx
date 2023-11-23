import {configureStore} from "@reduxjs/toolkit";
import {reducer} from "../../../src/state/rootReducer";
import React, {PropsWithChildren} from "react";
import {Provider} from "react-redux";
import {fireEvent, render} from "@testing-library/react";
import {App} from "../../../src/components/App";
import {store} from "../../../src/state/store";
import {screen} from '@testing-library/react'
import {test} from "@jest/globals";

export function renderWithProviders(
    ui: React.ReactElement,
    {
        store = configureStore({reducer}),
    } = {}
) {
    function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    const renderOptions = {}

    // Return an object with the store and all of RTL's query functions
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}

describe("integration test", () => {
    test("does something", () => {
        renderWithProviders(<App/>, {store})

        expect(testMapping()).toEqual([1, 1, 0,0, 1, 4]) // would be great if I could achieve multirow

        fireEvent.click(screen.getByRole('button', {name: "+"}))

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        // console.log(screen.getByText(/RTT app/i))
        // expect().toBeInTheDocument()

        expect(testMapping()).toEqual([1, 1, 0,0,0, 1, 4,0]) // would be great if I could achieve multirow

    })
});

const testMapping = () => {
    return screen.getAllByTitle("mapping-input").map(_ => parseInt(_.value))
}