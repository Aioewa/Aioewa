export async function onTab({ addon, tab, console }) {

    let themes = (await (await addon.chrome.storage.sync.get().valueOf()));
    console.log("running only on nikeedev.stio.studio");

    switch (themes.addonSettings.themes) {
        case 'Refresh':
            document.documentElement.style.setProperty("--main-color", "rgb(98, 113, 247)");
            document.documentElement.style.setProperty("--back-color", "#282828");
            break;
        case 'Old':
            document.documentElement.style.setProperty("--main-color", "rgb(98, 113, 247)");
            document.documentElement.style.setProperty("--back-color", "rgb(236, 233, 233");
            break;
        default:
            break;
    }
    
}