import * as aw from "./module.js"
globalThis.aw = aw

globalThis.addonsEnabled = await aw.storage.getAddonsEnabled()
globalThis.addonsSettings = await aw.storage.getAddonsSettings()
addonsEnabled?._addonChanged == undefined || delete addonsEnabled._addonChanged
addonsSettings?._addonChanged == undefined || delete addonsSettings._addonChanged

const imports = document.querySelectorAll("module")
imports.forEach(async (e) => {
    if (e.getAttribute("http")) {
        console.log(await import("http://127.0.0.1:5000/socket.io/socket.io.js"))
        aw.get.script(e.getAttribute("src"))
    }
    else {
        aw.get.script(chrome.runtime.getURL(location.pathname + "a/../" + e.getAttribute("src")))
    }
})
