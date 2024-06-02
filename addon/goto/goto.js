export async function onTab({ addon, console }) {
    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "copyToClipboard") {
            navigator.clipboard.writeText(request.text).then(() => {
                console.log('URL copied to clipboard', request.text);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    });

    // Wait for the element specified in the aw-goto parameter and scroll to it
    const awGoto = new URLSearchParams(window.location.search).get("aw-goto");
    if (awGoto) {
        const decodedSelector = decodeURIComponent(awGoto);
        const element = await addon.tab.waitForElement(decodedSelector);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            element.classList.add("aw-goto-selected");
        }
    }
}