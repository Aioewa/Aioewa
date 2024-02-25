// All the global variables for script.js and styles.js will be here.
// script.js and styles.js will be called here
// This is so that the json files don't have to be fetched 2 times. So it is for optimization.

Promise.all([
    import(chrome.runtime.getURL("/api/module.js"))
]).then(([aw]) => {
    globalThis.aw = aw
    globalThis.addonRootUrl = chrome.runtime.getURL("/addon/")
    // const IF_ = {}
    Promise.all([
        aw.storage.getAddonsEnabled(),
        aw.storage.getAddonsSettings(),
        aw.storage.getCache(),
    ]).then(([addonsEnabled, addonsSettings, cache]) => {
        if (addonsEnabled?._addonChanged != undefined) delete addonsEnabled._addonChanged;
        globalThis.addonsEnabled = addonsEnabled

        aw.infoListenerGetter(addonsEnabled, (info) => {
            // console.log(typeof e?.code == "object")
            if (typeof info?.code == "object") {
                Object.keys(info.code).forEach(async (a) => {
                    info.code[a] = await aw.DAO(info.code[a], info)

                    if (a.slice(0, 3) == "IF_") return
                    if (!Array.isArray(info.code[a])) info.code[a] = [info.code[a]]
                    aw.IF_scriptListenerGetter(info, addonRootUrl + info.id, a, async (b, c) => {
                        const addon = {
                            info,
                            settings: new Proxy(await(await aw.storage.getAddonsSettings())?.[info.id] || {}, {
                                get: (target, string) => {
                                    return target[string]
                                }
                            }),
                            tab: aw.tab,
                        };
                        const localConsole = { ...aw.console._realConsole, ...aw.console.easyCreate(info.id, a) }
                        switch (a) {
                            case "onTab":
                                b.onTab({ addon, console: localConsole })
                                break;
                            case "css":
                                document.head.append(b)
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