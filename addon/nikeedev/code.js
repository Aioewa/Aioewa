
export async function onTab({ addon, tab, console }) {
    // switch (addon.settings.theme) {

    // }
    // console.log(addon.settings)
    console.log(await addon.chrome.storage.sync.get());
    document.documentElement.style.setProperty("--main-color", "rgb(98, 113, 247)");
    document.documentElement.style.setProperty("--back-color", "#282828");
}