export async function onTab({ addon, console }) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "copyToClipboard") {
            navigator.clipboard.writeText(request.text).then(() => {
                console.log('URL copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    });
    const awGoto = location.search.split("aw-goto=")[1]
    await (await addon.tab.waitForElement(awGoto)).scrollIntoView({ behavior: "smooth" })
}