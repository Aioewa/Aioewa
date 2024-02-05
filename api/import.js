new Promise((resolve, reject) => {
    // console.log(chrome.runtime.getURL(location.pathname + "/../" + "../js/settingsButton.js"))
    (async () => {
        const [module] = await Promise.all([
            import(chrome.runtime.getURL("../../api/module.js"))
        ])
        window.aw = module
        const imports = document.querySelectorAll("module")
        imports.forEach((e)=>{
            // console.log(chrome.runtime.getURL(location.pathname + "/../" + e.attributes.getNamedItem("src").textContent))
            module.getScript(chrome.runtime.getURL(location.pathname + "a/../" + e.attributes.getNamedItem("src").textContent))
        })
        resolve(true)
    })()
})