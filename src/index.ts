import axios from "axios"

const root: HTMLDivElement = document.createElement("div")
document.body.appendChild(root)

const input: HTMLInputElement = document.createElement("input")
input.value = "optimizeGeneratorTuningMap?unparsedT=[⟨1 1 0] ⟨0 1 4]}&tuningSchemeSpec=TILT minimax-U"
input.style.width = "700px"
root.appendChild(input)

const submit: HTMLButtonElement = document.createElement("button")
submit.innerText = "Submit"
root.appendChild(submit)

const results: HTMLDivElement = document.createElement("div")
root.appendChild(results)

const HOST = "https://rtt-lib.onrender.com/"

submit.onclick = () => {
    results.innerText = "Loading..."
    axios.get(
        HOST + encodeURI(input.value),
        {},
    ).then(data => {
        console.log("you tried to send", data.data)
        results.innerText = data.data
    }).catch(e => {
        console.log("axios error: ", e)
    })
}
