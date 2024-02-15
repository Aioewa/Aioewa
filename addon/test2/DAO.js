export function DAO({input}) {
    const rem = {
        "onTab": "addon.js",
        "background": "background.js",
        "__DAO_onTab__": "addon.js",
    }
    return rem[input]
}