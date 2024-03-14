import { console } from "./console.js"

export const get = {
    URL: chrome.runtime.getURL,
    async info(_url = null) {
        const addons = await (await this.JSON(chrome.runtime.getURL("../../addon/addon.json")))
        let rem = []
        addons.forEach(async (e) => {
            try {
                const rem_a = await this.JSON(chrome.runtime.getURL(`../../addon/${e}/info.json`))
                rem_a.id = e
                rem.push(rem_a)                
            } catch (error) {
                rem.push({
                    "id": e,
                    "AV": "1",
                    "name": "ERROR",
                    "description": "ERROR getting addon. Please turn this addon off.",
                    "versionAdded": "1.0.0",
                })
            }
        })
        await new Promise(async (resolve, reject) => {
            const update = () => {
                if (rem.length == addons.length) {
                    resolve(true)
                }
                else {
                    setTimeout(update)
                }
            }
            update()

        })
        return rem
    },
    async JSON(_url) {
        return (await fetch(_url)).json();
    },
    async script(_url) {
        const rem = _url.split(".")
        // try {
            switch (rem[rem.length - 1]) {
                case "js":
                    return (await Promise.all([
                        import(_url)
                    ]))[0];
                    break;
                case "css":
                    const element = document.createElement("link")
                    element.rel = "stylesheet"
                    element.href = _url
                    return element
                    break;

                default:
                    console.error(`${_url} is not a valid file`)
                    break;
            }
        // }
        // catch (error) {
        //     console.error(`Failed to get ${_url}\nReason: ${error}`)
        // }
    }
}