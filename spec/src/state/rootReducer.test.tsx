// TODO: start adding some state tests; mock out axios 

import {reducer} from "../../../src/state/rootReducer";
import {initialState} from "../../../src/state/initialState";
import {ObjectState} from "../../../src/state/types";
import {COLS} from "../../../src/constants";

let newState: ObjectState;

describe("root reducer", () => {
    describe("expandDomain", () => {
        beforeEach(() => {
            newState = reducer(initialState, {type: "expandDomain"})
        })

        it("increases dimensionality and rank by 1 each", () => {
            expect(initialState.dimensionality).toBe(3)
            expect(newState.dimensionality).toBe(4)
            // expect(initialState.rank).toBe(2)
            // expect(newState.rank).toBe(3)
        })

        it("expands the mapping", () => {
            expect(initialState.mapping).toEqual([
                [1, 1, 0],
                [0, 1, 4],
            ])
            expect(newState.mapping).toEqual([
                [1, 1, 0, 0],
                [0, 1, 4, 0],
                // [0, 0, 0, 0],
            ])
        });

        it("expands the comma basis", () => {
            expect(initialState.commaBasis).toEqual([
                [-4, 4, -1]
            ])
            expect(newState.commaBasis).toEqual([
                [-4, 4, -1, 0]
            ])
        });

        it("expands the domain and adds padding", () => {
            const initialDomain = initialState.view.cols[COLS.DOMAIN_PRIMES].subcols.map(_ => _.name);
            const newDomain = newState.view.cols[COLS.DOMAIN_PRIMES].subcols.map(_ => _.name);
            expect(initialDomain).toEqual(
                ["p_1", "p_2", "p_3", "plus"]
            )
            expect(newDomain).toEqual(
                ["left padding", "p_1", "p_2", "p_3", "p_4", "plus", "right padding", "horizontal margin"]
            )
        });
    })
})
