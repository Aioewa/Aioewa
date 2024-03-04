export async function IF_onTab({call}) {
    return window.location.href == "https://nikeedev.stio.studio" || window.location.href == "https://nikeedev.stio.studio/projects" || document.title == "Nikita Goncarenko";
}