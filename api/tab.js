const mutationObserver = new MutationObserver((mutRecs) => {
    mutRecs.forEach(mutRec => {
        mutRec.addedNodes.forEach((addedNode) => {
            _mutationCallbacks.forEach((callback) => {
                callback(addedNode)
            })
        })
    });
})
const _mutationCallbacks = []

export const tab = {

    /**
     * <Describe what the function does here>
     * 
     * @param selector The selector of the element to wait for.
     * @returns The element when found.
     */
    waitForElement(selector) {
        const foundElement = document.documentElement.querySelector(selector)
        if (foundElement) {
            return foundElement
        }
        return new Promise((resolve, reject) => {
            mutationObserver.observe(document.documentElement, { childList: true, subtree: true })
            _mutationCallbacks.push((element) => {
                const foundElement = element.querySelector?.(selector)
                if (foundElement) {
                    resolve(foundElement)
                }
            })
        })
    },
    /**
    * <Describe what the function does here>
    * 
    * @param selector The selector of the element to wait for.
    * @param callback The callback to execute when the element has been found.
    */
    listenForElements(selector, callback) {
        const foundElement = document.documentElement.querySelectorAll(selector)
        foundElement.forEach(callback)
        mutationObserver.observe(document.documentElement, { childList: true, subtree: true })
        _mutationCallbacks.push((element) => {
            const foundElement = element.querySelectorAll?.(selector)
            foundElement?.forEach(callback)
        })
    }
}
