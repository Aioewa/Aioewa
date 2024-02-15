export async function IF_onTab({call}) {
    return window.location.hostname == "nikeedev.stio.studio" || document.title == "Nikita Goncarenko";
}