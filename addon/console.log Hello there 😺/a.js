export function onTab({addon, tab, console, ...more}) {
    console._realConsole.log("Hello there 😺")
    console.log(addon, tab, console, more)
}