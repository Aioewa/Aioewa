// All the global variables for script.js and styles.js will be here.
// script.js and styles.js will be called here
// This is so that the json files don't have to be fetched 2 times. So it is for optimization.

Promise.all([
    import(chrome.runtime.getURL("../../api/module.js")),
    import(chrome.runtime.getURL("../../api/inject/script.js")),
    import(chrome.runtime.getURL("../../api/inject/style.js")),
]).then(([aw, script, style])=>{
    globalThis.aw = aw
    globalThis.addonRootUrl = chrome.runtime.getURL("/addon/")
    Promise.all([
        aw.storage.getAddonsEnabled(),
        aw.storage.getAddonsSettings(),
    ]).then(([addonsEnabled, addonsSettings])=>{
        if(addonsEnabled?._addonChanged != undefined) delete addonsEnabled._addonChanged;
        globalThis.addonsEnabled = addonsEnabled

        aw.infoListenerGetter(addonsEnabled, (info)=>{
            // console.log(typeof e?.code == "object")
            if (typeof info?.code == "object") {
                Object.keys(info.code).forEach(async (a)=>{
                    if (!Array.isArray(info.code[a])) info.code[a] = [info.code[a]]
                    aw.scriptListenerGetter(addonRootUrl+info.id, info.code[a], (b)=>{
                        const addon = {
                            info,
                            settings: new Proxy(addonsSettings[info.id] || {},{
                                get: (target, string)=>{
                                    return target[string]
                            }})
                        };
                        const localConsole = { ...aw._realConsole, ...aw.easyCreateConsole(info.id, a) }
                        switch (a) {
                            case "onTab":
                                b.onTab({addon, console: localConsole})
                                break;
                        
                            default:
                                break;
                        }
                    })
                })
            }
        })

    })
    // Promise.all([
    //     style.getStyles()
    // ])
    // style.inject()
})