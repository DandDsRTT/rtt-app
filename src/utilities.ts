const transposeArray = (array: number[][]) => {
    return array[ 0 ].map((_, columnIndex) => array.map(row => row[ columnIndex ]))
}

const convertMappingToEbk = (mapping: number[][]) => {
    let ebk = "["
    for (const mappingRow of mapping) {
        ebk += "⟨"
        for (const mappingElement of mappingRow) {
            ebk += mappingElement + ","
        }
        ebk += "]"
    }
    ebk += "]"

    return ebk
}

const convertCommaBasisToEbk = (commaBasis: number[][]) => {
    let ebk = "["
    for (const commaBasisRow of commaBasis) {
        ebk += "["
        for (const commaBasisElement of commaBasisRow) {
            ebk += commaBasisElement + ","
        }
        ebk += "⟩"
    }
    ebk += "]"

    return ebk
}

export {
    transposeArray,
    convertMappingToEbk,
    convertCommaBasisToEbk,
}
