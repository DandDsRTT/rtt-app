import { reducer } from "./rootReducer"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer, 
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export {
    store,
}
