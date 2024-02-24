export async function onTab({addon, tab, console, ...more}) {
    if (addon.settings.log != undefined) {
        console._realConsole.log(addon.settings.log)
    }
    else {
        console._realConsole.log("Hello there 😺")
    }
}