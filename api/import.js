import * as aw from "./module.js"
globalThis.aw = aw

const imports = document.querySelectorAll("module")
imports.forEach((e)=>{
    aw.get.script(chrome.runtime.getURL(location.pathname + "a/../" + e.getAttribute("src")))
})