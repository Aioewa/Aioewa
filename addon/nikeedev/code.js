export async function onTab({ addon, tab, console }) {
    // console.log(addon.settings?.themes)
    console.log("running only on nikeedev.stio.studio");

    switch (addon.settings?.themes) {
        case 'None':
            break;
        case '"IDK, but it looks nice" theme':
            document.documentElement.style.setProperty("--bottom-color", "#211951");
            document.documentElement.style.setProperty("--top-color", "#836FFF");
            document.documentElement.style.setProperty("--text-color", "#15F5BA");
            document.documentElement.style.setProperty("--name", "#F0F3FF");
            document.documentElement.style.setProperty("--link-color", "#15F5BA");
            document.documentElement.style.setProperty("--link-menubar", "#F0F3FF");
            break;
        case 'The new old (Gruvbox)':
            document.documentElement.style.setProperty("--bottom-color", "#282828");
            document.documentElement.style.setProperty("--top-color", "#ebdbb2");
            document.documentElement.style.setProperty("--text-color", "#ebdbb2");
            document.documentElement.style.setProperty("--name", "#282828");
            document.documentElement.style.setProperty("--link-color", "#ebdbb2");
            document.documentElement.style.setProperty("--link-menubar", "#282828");

            document.documentElement.style.setProperty("--main-color", "#ebdbb2");
            document.documentElement.style.setProperty("--back-color", "#282828");
            break;
        case 'Old':
            document.documentElement.style.setProperty("--bottom-color", "rgb(98, 113, 247)");
            document.documentElement.style.setProperty("--top-color", "rgb(236, 233, 233)");
            document.documentElement.style.setProperty("--text-color", "rgb(236, 233, 233)");
            document.documentElement.style.setProperty("--name", "rgb(98, 113, 247)");
            document.documentElement.style.setProperty("--link-color", "rgb(236, 233, 233)");
            document.documentElement.style.setProperty("--link-menubar", "rgb(98, 113, 247)");
            break;
        case 'Vintage':
            document.documentElement.style.setProperty("--bottom-color", "#2D3250");
            document.documentElement.style.setProperty("--top-color", "#424769");
            document.documentElement.style.setProperty("--text-color", "#7077A1");
            document.documentElement.style.setProperty("--name", "#F6B17A");
            document.documentElement.style.setProperty("--link-color", "#F6B17A");
            document.documentElement.style.setProperty("--link-menubar", "#F6B17A");
            break;
        case 'Purple':
            document.documentElement.style.setProperty("--bottom-color", "#33186B");
            document.documentElement.style.setProperty("--top-color", "#7360DF");
            document.documentElement.style.setProperty("--text-color", "#C499F3");
            document.documentElement.style.setProperty("--name", "#F2AFEF");
            document.documentElement.style.setProperty("--link-color", "#C499F3");
            document.documentElement.style.setProperty("--link-menubar", "#F2AFEF");
        case 'Sunset':
            document.documentElement.style.setProperty("--bottom-color", "#711DB0");
            document.documentElement.style.setProperty("--top-color", "#C21292");
            document.documentElement.style.setProperty("--text-color", "#FFA732");
            document.documentElement.style.setProperty("--name", "#FFA732");
            document.documentElement.style.setProperty("--link-color", "#FFA732");
            document.documentElement.style.setProperty("--link-menubar", "#FFA732");
            break;

        default:
            break;
    }

}