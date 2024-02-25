export async function DAO({ input, addon, console }) {
    console.log(await aw.DAO("__MSG_extName__", addon.info))
    const rem = {
        "onTab": ["addon.js", "code.js"],
        "background": "background.js",
        "name": "DAO test",
        "description": "This works?",
    }
    return rem[input]
}