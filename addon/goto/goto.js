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
    const awGoto = decodeURIComponent(location.search.split("aw-goto=")[1])
    const element = await addon.tab.waitForElement(awGoto)
    element.scrollIntoView({ behavior: "smooth" })
    setTimeout(()=>{
        element.focus()
    }, 1000)
}