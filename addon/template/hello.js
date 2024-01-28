export default async function({addon, console}) {
    console.log(await addon.chrome.storage.sync.get());
}