function transposeArray(array, arrayLength) {
    var newArray = []
    for (var i = 0; i < array.length; i++) {
        newArray.push([])
    }


    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < arrayLength; j++) {
            newArray[ j ].push(array[ i ][ j ])
        }

    }

    return newArray
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

    console.log("comma baiss ebk", ebk)
    
    return ebk
}

export {
    transposeArray,
    convertMappingToEbk,
    convertCommaBasisToEbk,
}
