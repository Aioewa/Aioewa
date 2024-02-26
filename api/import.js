import * as aw from "./module.js"
globalThis.aw = aw

globalThis.addonsEnabled = await aw.storage.getAddonsEnabled()
globalThis.addonsSettings = await aw.storage.getAddonsSettings()
addonsEnabled?._addonChanged == undefined || delete addonsEnabled._addonChanged
addonsEnabled?._addonChanged == undefined || delete addonsSettings._addonChanged

const imports = document.querySelectorAll("module")
imports.forEach((e)=>{
    aw.get.script(chrome.runtime.getURL(location.pathname + "a/../" + e.getAttribute("src")))
})
