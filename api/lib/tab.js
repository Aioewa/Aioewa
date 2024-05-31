const mutationObserver = new MutationObserver((mutRecs) => {
    _mutationCallbacks.forEach((callback) => {
        callback(document.documentElement)
    })
    mutRecs.forEach(mutRec => {
        mutRec.addedNodes.forEach((addedNode) => {
            _mutationWeakSet.add(addedNode)
        })
    });
    // mutRecs.forEach(mutRec => {
    //     mutRec.addedNodes.forEach((addedNode) => {
    //         _mutationCallbacks.forEach((callback) => {
    //             callback(addedNode)
    //         })
    //     })
    // });
})
const _mutationCallbacks = []
const _mutationWeakSet = new WeakSet()

export const tab = {
    /**
     * <Describe what the function does here>
     * 
     * @param selector The selector of the element to wait for.
     * @returns The element when found.
     */
    waitForElement(selector) {
        const foundElement = document.querySelector(selector)
        if (foundElement) {
            return new Promise((resolve, reject) => {
                resolve(foundElement)
                
            })
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
        const foundElement = document.querySelectorAll(selector)
        foundElement.forEach(callback)
        mutationObserver.observe(document.documentElement, { childList: true, subtree: true })
        _mutationCallbacks.push((element) => {
            const foundElement = element.querySelectorAll?.(selector)
            foundElement?.forEach(callback)
        })
    }
}
