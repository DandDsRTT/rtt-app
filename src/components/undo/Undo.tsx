import {handleUndo} from "./handlers";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../state/types";

const Undo = () => {
    const snapshots = useSelector((state: State) => state.objects.snapshots)
    const loading = useSelector((state: State) => state.view.loading)
    const dispatch = useDispatch()

    return (
        <div>
            <button disabled={loading || !snapshots.length} className="undo" onClick={() => handleUndo(dispatch)}>undo</button>
        </div>
    )
}

export {
    Undo,
}
