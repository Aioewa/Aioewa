// let addonsURL = null
// fetch("/addon/addon.json").then(async (addonJsonFile) => {
//     const addonJson = await addonJsonFile.json()
//     const addons = await Promise.all(addonJson.map(async (e) => {
//         const info = await (await fetch(`/addon/${e}/info.json`)).json()
//         info.id = e
//         return info
//     }))
//     addonsURL = addons.map((e) => {
//         if (e?.code?.bg == undefined) return
//         const bgArray = Array.isArray(e?.code?.bg) ? e?.code?.bg : [e?.code?.bg]
//         return bgArray.map((bg) => {
//             return `/addon/${e.id}/${bg}`
//         })
//     })
// })
// setTimeout(() => {
//     console.log(addonsURL)
//     addonsURL.forEach(a => {
//         a.forEach((e) => {
//             importScripts(e)
//         })
//     });
// }, 1000)



importScripts("/addon/goto/goto-bg.js")

/*
console.log("Background is up and running!")
chrome.runtime.setUninstallURL('https://aioewa.stio.studio/uninstall');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.to != "background" && request.to != "bg") return
    switch (request.type) {
        case "test":
            sendResponse("works? ✅")
            break;

        case "fetch":
            (async () => {
                switch (request.outputAs) {
                    case "json":
                        const e = await (await fetch(request.input, request.init)).json()
                        sendResponse(e)
                        break;

                    default:
                        break;
                }
            })()
            return true
            break;

        default:
            break;
    }
});

function enabledByDefaultCheck() {
    Promise.all([
        storage.getAddonsEnabled(),
        storage.getAddonsSettings(),
        get.info()
    ]).then(async ([addonsEnabled, addonsSettings, info]) => {
        if (addonsEnabled == undefined) addonsEnabled = {}
        info.forEach((e) => {
            if (addonsEnabled?.[e.id] == undefined && e?.enabledByDefault != undefined) {
                addonsEnabled[e.id] = true
            }
        })
        storage.setAddonsEnabled(addonsEnabled)
    })
}

enabledByDefaultCheck()

storage.onChanged.addListener((e) => {
    if (e?.addonsEnabled?.newValue == undefined) {
        enabledByDefaultCheck()
    }
})

// console.log(chrome)
// function injectCSS(tabId, cssFile) {
//     chrome.scripting.insertCSS({
//         target: { tabId: tabId },
//         files: [cssFile]
//     });
// }

// // Example usage:
// chrome.action.onClicked.addListener((tab) => {
//     injectCSS(tab.id, { file: "extension/addon/test6/a.css" }); // Replace "styles.css" with your CSS file path
// });

*/