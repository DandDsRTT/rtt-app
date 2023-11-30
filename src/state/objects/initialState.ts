import {ObjectsState} from "./types";

const initialObjectsState: ObjectsState = {
    dimensionality: 3,
    rank: 2,
    mapping: [[1, 1, 0], [0, 1, 4]],
    commaBasis: [[-4, 4, -1]],
    snapshots: [],
}

export {
    initialObjectsState,
}