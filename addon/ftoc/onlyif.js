export async function IF_onTab({call}) {
    return window.location.href.startsWith("http");
}