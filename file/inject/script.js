let addons = [];
(async () => {
    const [module] = await Promise.all([
        import(chrome.runtime.getURL("../../api/module.js"))
    ])
    const console = module.easyCreateConsole("Inject script")
    console.log("Aioewa inject START")
    let i = -1;
    let json = await module.getJSON(chrome.runtime.getURL("../../addon/addon.json"))
    await new Promise(async (resolve, reject) => {
        await (json).forEach(async (e) => {
            try {
                i++
                const _module = await module.getScript(chrome.runtime.getURL(`../../addon/${e}/addon.js`))
                addons[i] = ({
                    name: e,
                    module: _module,
                    scripts: []
                })

                if (_module.tab == undefined) return
                
                const addon = {
                    self: addons[i],
                    
                }
                const msg = chrome.i18n
                const localConsole = module.easyCreateConsole(addons[i].name)
                
                let j = -1;
                await _module.tab({addon, console: {...module._realConsole, ...localConsole}, msg}).forEach(async (a)=>{
                    try {
                        j++
                        const _module = await module.getScript(chrome.runtime.getURL(`../../addon/${e}/${a.path}`))
                        addons[i].scripts[j] = {
                            name: a.path,
                            module: _module
                        }
                        const addon = {
                            self: addons[i].scripts[j],
                            storage: chrome.storage,
                            chrome,
                        }
                        const localConsole = module.easyCreateConsole(addons[i].name, addons[i].scripts[j].name)

                        _module.default({addon, console: {...module._realConsole, ...localConsole}, msg})
                    } catch (error) {
                        console.error(`Fail to start:`, chrome.runtime.getURL(`../../addon/${e}/${a.path}`), "\nReason:", error)
                    }
                })
            } catch (error) {
                console.error(`Fail to start:`, chrome.runtime.getURL(`../../addon/${e}/addon.js`), "\nReason:", error)
            }
            if (i + 2 > json.length) {
                resolve(addons)
            }
        });
    })
    console.log("Aioewa inject END")
})()
