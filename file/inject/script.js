let addons = [];
(async () => {
    const [aw] = await Promise.all([
        import(chrome.runtime.getURL("../../api/module.js"))
    ])
    const console = aw.easyCreateConsole("Inject script")
    console.log("Aioewa inject START")
    let i = -1;
    const json = await aw.getJSON(chrome.runtime.getURL("../../addon/addon.json"))
    const enabled = await aw.storage.getAddonsEnabled()
    // console.log(enabled)
    let addonsDoneLoading = 0
    
    await (json).forEach(async (e) => {
        try {
            i++
            const info = await aw.getJSON(chrome.runtime.getURL(`../../addon/${e}/info.json`))
            info.id = e
            if (info.AV == undefined) throw new Error("Missing AV property")
            if (info.AV == 1) {
                if (enabled?.[e] != true) {
                    addonsDoneLoading++
                    return
                }
                const addon = {
                    chrome,
                    aw,
                    info,
                };
                const rem = await aw.storage.getAddonsSettings(e) || {}
                if (rem != {}) {
                    addon.settings = new Proxy(rem,{
                        get: (target, string)=>{
                            return target[string]
                        }
                    })
                }
                let onTab = await aw.infoCodeRunner(info, "onTab", info.code?.onTab, e, {addon})
            }
            addonsDoneLoading++
        } catch (error) {
            console.error(`Fail to start:`, chrome.runtime.getURL(`../../addon/${e}/addon.js`), "\nReason:", error)
            addonsDoneLoading++
        }
    })
    await new Promise(async (resolve, reject) => {
        const update = ()=>{
            if (addonsDoneLoading == json.length) {
                resolve(addons)
            }
            else {
                requestAnimationFrame(update)
            }
        }
        update()
    })
    console.log("Aioewa inject END")
})()
