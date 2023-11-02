import { createStore, Store } from "redux"
import { reducer } from "./rootReducer"
import { MyAction, MyState } from "./types"

const store: Store<MyState, MyAction> = createStore(reducer)

export {
    store,
}
