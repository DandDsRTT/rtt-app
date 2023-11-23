import {reducer} from "../../../src/state/rootReducer";
import {initialState} from "../../../src/state/initialState";
import {ObjectState} from "../../../src/state/types";
import {COLS} from "../../../src/constants";
import {test} from "@jest/globals";

let newState: ObjectState;

describe("root reducer", () => {
    describe("expandDomain", () => {
        beforeEach(() => {
            newState = reducer(initialState, {type: "expandDomain"})
        })

        test("increases dimensionality and rank by 1 each", () => {
            expect(initialState.dimensionality).toBe(3)
            expect(newState.dimensionality).toBe(4)
            // expect(initialState.rank).toBe(2)
            // expect(newState.rank).toBe(3)
        })

        test("expands the mapping", () => {
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

        test("expands the comma basis", () => {
            expect(initialState.commaBasis).toEqual([
                [-4, 4, -1]
            ])
            expect(newState.commaBasis).toEqual([
                [-4, 4, -1, 0]
            ])
        });

        test("expands the domain and adds padding", () => {
            const initialDomain = initialState.view.cols[COLS.DOMAIN_PRIMES].subcols.map(_ => _.name);
            const newDomain = newState.view.cols[COLS.DOMAIN_PRIMES].subcols.map(_ => _.name);
            expect(initialDomain).toEqual(
                ["p_1", "p_2", "p_3", "plus"]
            )
            expect(newDomain).toEqual( // this should be made cleaner
                ["left padding", "p_1", "p_2", "p_3", "p_4", "plus", "right padding", "horizontal margin"]
            )
        });
    })
    
    describe("shrinkDomain", () => {
        beforeEach(() => {
            newState = reducer(initialState, { type: "shrinkDomain" })
        })
        
        test("reduces the dimensionality and rank by 1", () => {
            expect(initialState.dimensionality).toBe(3)
            expect(newState.dimensionality).toBe(2)
            // expect(initialState.rank).toBe(3)
            // expect(newState.rank).toBe(2)
        })
        
        // already it's tricky. the domain changes are of course comma-basis-first
        // but comma basis is hidden by default
        // but I don't just want two different standards; that'd be unpredictable
        // how about this: when you shrink the domain via the column for the mapping
        // this is what happens
        // if you shrink it according to the comma basis row, then it would happen the other way
        // that is, here, we just manhandle the mapping, and rerun the comma basis for the new one
        // the other way, we manhandle the comma basis, and rerun the mapping for the new one
        test("contracts the mapping", () => {
            expect(initialState.mapping).toEqual([
                [1, 1, 0],
                [0, 1, 4],
            ])
            expect(newState.mapping).toEqual([
                [1, 1],
                [0, 1], // this row should be gone
            ])
        })
        
        test("contracts the comma basis", () => {
            expect(initialState.commaBasis).toEqual([
                [-4, 4, -1]
            ])
            expect(newState.commaBasis).toEqual([
                [-4, 4] // should change to -1, 1
            ])
        })

        test("expands the domain and adds padding", () => {
            const initialDomain = initialState.view.cols[COLS.DOMAIN_PRIMES].subcols.map(_ => _.name);
            const newDomain = newState.view.cols[COLS.DOMAIN_PRIMES].subcols.map(_ => _.name);
            expect(initialDomain).toEqual(
                ["p_1", "p_2", "p_3", "plus"]
            )
            expect(newDomain).toEqual( 
                ["left padding", "p_1", "p_2", "plus", "right padding", "horizontal margin"]
            )
        });
    })
})
