import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./components/App"
import { store } from "./state/store"
import "./styles.scss"

const rootElement: HTMLDivElement = document.createElement("div")
document.body.appendChild(rootElement)
const root = createRoot(rootElement)
root.render(
    <Provider store={store}>
        <h1>RTT App</h1>
        <App/>
    </Provider>,
)
