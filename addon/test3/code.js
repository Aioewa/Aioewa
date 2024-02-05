export default async function({addon, console}) {
    console.log(addon.chrome);
    await addon.chrome.storage.sync.clear()
    await addon.chrome.storage.sync.set({wow: {
        hi: "hello world",
        wow: "hello",
    }})
}