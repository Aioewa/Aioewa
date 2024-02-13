export async function onTab({addon, tab, console, ...more}) {
    console._realConsole.log(addon.settings.log)
}