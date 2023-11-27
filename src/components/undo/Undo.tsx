import {handleUndo} from "./handlers";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {ObjectState} from "../../state/types";

const Undo = () => {
    const snapshots = useSelector((state: ObjectState) => state.snapshots)
    const loading = useSelector((state: ObjectState) => state.loading)
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
