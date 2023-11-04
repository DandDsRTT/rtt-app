import React from "react"
import {Domain} from "./domain/Domain";
import {CommaBasis} from "./commaBasis/CommaBasis";
import {Mapping} from "./mapping/Mapping";

const App = () => {
    return (
        <div className="container">
            <Domain/>
            <Mapping/>
            <CommaBasis/>
        </div>
    )
}

export {
    App,
}
