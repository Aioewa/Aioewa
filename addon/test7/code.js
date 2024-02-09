export default async function({addon, tab, console}) {
    console.log("call", addon, tab, console);
    await addon.chrome.storage.sync.clear()
    await addon.chrome.storage.sync.set({wow: {
        hi: "hello world",
        wow: "hello",
    }})
}