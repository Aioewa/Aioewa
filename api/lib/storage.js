export const storage = {
    /**
     * Asynchronously retrieves the addons enabled value from chrome.storage.sync.
     *
     * @param {string} _get - optional parameter for retrieving a specific addon value
     * @return {any} the addons enabled value or a specific addon value if _get is provided
     */
    async getAddonsEnabled(_get = null) {
        if (_get == null) {
            return (await chrome.storage.sync.get("addonsEnabled")).addonsEnabled
        }
        else {
            return (await chrome.storage.sync.get("addonsEnabled")).addonsEnabled[_get]
        }
    },

    /**
     * Set whether addons are enabled or not.
     *
     * @param {Object} set - the value to set for addonsEnabled
     * @return {void} 
     */
    setAddonsEnabled(set) {
        chrome.storage.sync.set({ addonsEnabled: set })
    },

    /**
     * Async function to get addon settings.
     *
     * @param {string} _get - optional parameter to specify a specific addon setting to retrieve
     * @return {Promise} The value of the specified addon setting, or all addon settings if _get is null
     */
    async getAddonsSettings(_get = null) {
        if (_get == null) {
            return (await chrome.storage.sync.get("addonSettings")).addonSettings
        }
        else {
            return (await chrome.storage.sync.get("addonSettings")).addonSettings?.[_get]
        }
    },

    
    /**
     * Set addon settings in Chrome storage.
     *
     * @param {Object} set - The settings to be stored
     * @return {void} 
     */
    setAddonsSettings(set) {
        chrome.storage.sync.set({ addonSettings: set })
    },

    
    /**
     * Asynchronously retrieves the cache from chrome storage.
     *
     * @param {string} _get - The key to retrieve from the cache
     * @return {Promise<string>} The value associated with the given key in the cache
     */
    async getCache(_get = null) {
        if (_get == null) {
            return (await chrome.storage.sync.get("cache")).cache
        }
        else {
            return (await chrome.storage.sync.get("cache")).cache?.[_get]
        }
    },

    
    /**
     * Set the cache in the chrome.storage.sync.
     *
     * @param {string} set - the value to set in the cache
     * @return {any} 
     */
    setCache(set) {
        chrome.storage.sync.set({ cache: set })
    },

    
    /**
     * Updates or adds a setting inside a specified object, and updates the addonChanged field in the storage.
     *
     * @param {string} insideOf - the object inside of which the setting will be changed or added
     * @param {string} setting - the setting to be changed or added
     * @param {any} value - the value to be set for the setting
     * @return {Promise<void>} - returns a promise that resolves after the setting is updated
     */
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