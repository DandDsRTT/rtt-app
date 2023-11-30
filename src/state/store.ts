import { configureStore } from "@reduxjs/toolkit"
import {objectsReducer} from "./objects/reducer";
import {viewReducer} from "./view/reducer";

const store = configureStore({
    reducer: {
        objects: objectsReducer,
        view: viewReducer,
    }
})

export {
    store,
}
