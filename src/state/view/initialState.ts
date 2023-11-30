import {ViewState} from "./types"

const initialViewState: ViewState = {
    loading: false,
    view: {
        rows: [
            {
                name: "column names",
                viewState: "visible",
                subRows: [
                    {
                        type: "main",
                        gridRow: 0,
                    },
                ],
            },
            {
                name: "collapses",
                viewState: "visible",
                subRows: [
                    {
                        type: "main",
                        gridRow: 0,
                    },
                ],
            },
            {
                name: "cardinality",
                viewState: "collapsed",
                subRows: [
                    {
                        type: "main",
                        gridRow: 0,
                    },
                    {
                        type: "name",
                        gridRow: 0,
                    },
                ],
            },
            {
                name: "removes and expands",
                viewState: "visible",
                subRows: [
                    {
                        type: "main",
                        gridRow: 0,
                    },
                ],
            },
            {
                name: "header",
                viewState: "visible",
                subRows: [
                    {
                        type: "gridded",
                        index: 0,
                        gridRow: 0,
                    },
                    {
                        type: "text",
                        gridRow: 0,
                    },
                ],
            },
            {
                name: "units",
                viewState: "hidden",
                subRows: [
                    {
                        type: "main",
                        gridRow: 0,
                    },
                ],
            },
            {
                name: "intervals",
                viewState: "collapsed",
                subRows: [
                    {
                        type: "gridded",
                        index: 0,
                        gridRow: 0,
                    },
                    {
                        type: "gridded",
                        index: 1,
                        gridRow: 0,
                    },
                    {
                        type: "gridded",
                        index: 2,
                        gridRow: 0,
                    },
                    {
                        type: "name",
                        gridRow: 0,
                    },
                    {
                        type: "plus",
                        gridRow: 0,
                    },
                ],
            },
            {
                name: "mapping",
                viewState: "visible",
                subRows: [
                    {
                        type: "gridded",
                        index: 0,
                        gridRow: 0,
                    },
                    {
                        type: "gridded",
                        index: 1,
                        gridRow: 0,
                    },
                    {
                        type: "name",
                        gridRow: 0,
                    },
                    {
                        type: "plus",
                        gridRow: 0,
                    },
                ],
            },
        ],
        cols: [
            {
                name: "row names",
                viewState: "visible",
                subColumns: [
                    {
                        type: "main",
                        gridColumn: 0,
                    },
                ],
            },
            {
                name: "collapses",
                viewState: "visible",
                subColumns: [
                    {
                        type: "main",
                        gridColumn: 0,
                    },
                ],
            },
            {
                name: "removes and expands",
                viewState: "visible",
                subColumns: [
                    {
                        type: "main",
                        gridColumn: 0,
                    },
                ],
            },
            {
                name: "header",
                viewState: "visible",
                subColumns: [
                    {
                        type: "main",
                        gridColumn: 0,
                    },
                ],
            },
            {
                name: "units",
                viewState: "hidden",
                subColumns: [
                    {
                        type: "main",
                        gridColumn: 0,
                    },
                ],
            },
            {
                name: "generators",
                viewState: "hidden",
                subColumns: [
                    {
                        type: "gridded",
                        index: 0,
                        gridColumn: 0,
                    },
                    {
                        type: "gridded",
                        index: 1,
                        gridColumn: 0,
                    },
                    {
                        type: "gridded",
                        index: 2,
                        gridColumn: 0,
                    },
                ],
            },
            {
                name: "domain primes",
                viewState: "visible",
                subColumns: [
                    {
                        type: "gridded",
                        index: 0,
                        gridColumn: 0,
                    },
                    {
                        type: "gridded",
                        index: 1,
                        gridColumn: 0,
                    },
                    {
                        type: "gridded",
                        index: 2,
                        gridColumn: 0,
                    },
                    {
                        type: "plus",
                        gridColumn: 0,
                    },
                ],
            },
            {
                name: "commas",
                viewState: "collapsed",
                subColumns: [
                    {
                        type: "gridded",
                        index: 0,
                        gridColumn: 0,
                    },
                    {
                        type: "plus",
                        gridColumn: 0,
                    },
                ],
            },
        ],
    },
}

export {
    initialViewState,
}
