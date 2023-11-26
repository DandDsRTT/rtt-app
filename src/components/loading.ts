const addLoading = () => {
    const loading = document.createElement("div");
    loading.innerText = "loading..."
    document.body.appendChild(loading)
    
    return loading
}

const removeLoading = (loadingDiv: HTMLDivElement) => document.body.removeChild(loadingDiv)

export {
    addLoading,
    removeLoading,
}
