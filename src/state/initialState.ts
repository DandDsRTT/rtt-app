import {ObjectState} from "./types";

const initialState: ObjectState = {
    dimensionality: 3,
    mapping: [[1, 1, 0], [0, 1, 4]],
    commaBasis: [[-4, 4, -1]],
    view: {
        rows: [
            {
                name: "col names",
                viewState: "visible",
                subrows: [
                    {
                        name: "main",
                        gridRow: 0,
                    }
                ]
            },
            {
                name: "collapses",
                viewState: "visible",
                subrows: [
                    {
                        name: "main",
                        gridRow: 0,
                    }
                ]
            },
            {
                name: "cardinality",
                viewState: "collapsed",
                subrows: [
                    {
                        name: "main",
                        gridRow: 0,
                    },
                    {
                        name: "name",
                        gridRow: 0,
                    },
                ],
            },
            {
                name: "removes and expands",
                viewState: "visible",
                subrows: [
                    {
                        name: "main",
                        gridRow: 0,
                    }
                ]
            },
            {
                name: "header",
                viewState: "visible",
                subrows: [
                    {
                        name: "gridded",
                        gridRow: 0,
                    },
                    {
                        name: "text",
                        gridRow: 0,
                    },
                ],
            },
            {
                name: "units",
                viewState: "hidden",
                subrows: [
                    {
                        name: "main",
                        gridRow: 0,
                    },
                ]
            },
            {
                name: "intervals",
                viewState: "collapsed",
                subrows: [
                    {
                        name: "p1",
                        gridRow: 0,
                    },
                    {
                        name: "p2",
                        gridRow: 0,
                    },
                    {
                        name: "p3",
                        gridRow: 0,
                    },
                    {
                        name: "plus",
                        gridRow: 0,
                    }
                ]
            },
            {
                name: "mapping",
                viewState: "visible",
                subrows: [
                    {
                        name: "g1",
                        gridRow: 0,
                    },
                    {
                        name: "g2",
                        gridRow: 0,
                    },
                    {
                        name: "plus",
                        gridRow: 0,
                    }
                ]
            }
        ],
        cols: [
            {
                name: "row names",
                viewState: "visible",
                subcols: [
                    {
                        name: "main",
                        gridCol: 0,
                    }
                ]
            },
            {
                name: "collapses",
                viewState: "visible",
                subcols: [
                    {
                        name: "main",
                        gridCol: 0,
                    }
                ]
            },
            {
                name: "removes and expands",
                viewState: "visible",
                subcols: [
                    {
                        name: "main",
                        gridCol: 0,
                    }
                ]
            },
            {
                name: "header",
                viewState: "visible",
                subcols: [
                    {
                        name: "main",
                        gridCol: 0,
                    },
                ]
            },
            {
                name: "units",
                viewState: "hidden",
                subcols: [
                    {
                        name: "main",
                        gridCol: 0,
                    },
                ]
            },
            {
                name: "generators",
                viewState: "hidden",
                subcols: [
                    {
                        name: "g1",
                        gridCol: 0,
                    },
                    {
                        name: "g2",
                        gridCol: 0,
                    },
                    {
                        name: "plus",
                        gridCol: 0,
                    }
                ]
            },
            {
                name: "domain primes",
                viewState: "visible",
                subcols: [
                    {
                        name: "p1",
                        gridCol: 0,
                    },
                    {
                        name: "p2",
                        gridCol: 0,
                    },
                    {
                        name: "p3",
                        gridCol: 0,
                    },
                    {
                        name: "plus",
                        gridCol: 0,
                    }
                ]
            },
            {
                name: "commas",
                viewState: "collapsed",
                subcols: [
                    {
                        name: "c1",
                        gridCol: 0,
                    },
                    {
                        name: "plus",
                        gridCol: 0,
                    }
                ]
            }
        ]
    }
}

export {
    initialState
}
