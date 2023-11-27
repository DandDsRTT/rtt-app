const HOST = "https://rtt-api-server.onrender.com/"

const PRIMES = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31,
]

const COLS = {
    "ROW_NAMES": 0,
    "COLLAPSES": 1,
    "REMOVES_AND_EXPANDS": 2,
    "HEADER": 3,
    "UNITS": 4,
    "GENERATORS": 5,
    "DOMAIN_PRIMES": 6,
    "COMMAS": 7,
}

const ROWS = {
    "COL_NAMES": 0,
    "COLLAPSES": 1,
    "CARDINALITY": 2,
    "REMOVES_AND_EXPANDS": 3,
    "HEADER": 4,
    "UNITS": 5,
    "INTERVALS": 6,
    "MAPPING": 7,
}

const SUBSCRIPTS = [
    "₀",
    "₁",
    "₂",
    "₃",
    "₄",
    "₅",
    "₆",
    "₇",
    "₈",
    "₉",
]

export {
    HOST,
    PRIMES,
    COLS,
    ROWS,
    SUBSCRIPTS,
}
