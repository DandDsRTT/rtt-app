import { actionTypes } from "./actions"
import { MyAction } from "./types"
import { initialState } from "./initialState"

const reducer = (state = initialState, action: MyAction) => {
    const { type, data } = action

    const newState = JSON.parse(JSON.stringify(state))

    console.log(type)

    switch (type) {
        case actionTypes.EXPAND_DOMAIN: {
            newState.standardDomainPrimeCount = newState.standardDomainPrimeCount + 1
            newState.mapping = newState.mapping.map((mappingRow: number[]) => [...mappingRow, 0])
            break
        }
        case actionTypes.SHRINK_DOMAIN: {
            newState.standardDomainPrimeCount = newState.standardDomainPrimeCount - 1
            newState.mapping = newState.mapping.map((mappingRow: number[]) => mappingRow.slice(0, newState.standardDomainPrimeCount))
            break
        }
    }

    return newState
}

export {
    reducer,
}
