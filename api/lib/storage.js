export const storage = {
    async getAddonsEnabled(_get = null) {
        if (_get == null) {
            return (await chrome.storage.sync.get("addonsEnabled")).addonsEnabled
        }
        else {
            return (await chrome.storage.sync.get("addonsEnabled")).addonsEnabled[_get]
        }
    },
    setAddonsEnabled(set) {
        chrome.storage.sync.set({ addonsEnabled: set })
    },


    async getAddonsSettings(_get = null) {
        if (_get == null) {
            return (await chrome.storage.sync.get("addonSettings")).addonSettings
        }
        else {
            return (await chrome.storage.sync.get("addonSettings")).addonSettings?.[_get]
        }
    },
    setAddonsSettings(set) {
        chrome.storage.sync.set({ addonSettings: set })
    },
    async getCache(_get = null) {
        if (_get == null) {
            return (await chrome.storage.sync.get("cache")).cache
        }
        else {
            return (await chrome.storage.sync.get("cache")).cache?.[_get]
        }
    },
    setCache(set) {
        chrome.storage.sync.set({ cache: set })
    },
    async changeOrAddSetting(insideOf, setting, value) {
        const rem = await storage.getAddonsSettings() || {}
        if (rem?.[insideOf] == undefined) {
            rem[insideOf] = {}
        }
        rem[insideOf][setting] = value
        rem._addonChanged = {
            type: "addonsSettings",
            change: {
                name: [insideOf],
                value: [setting, value]
            }
        }
        storage.setAddonsSettings(rem)
    },
    onChanged: chrome.storage.sync.onChanged
}