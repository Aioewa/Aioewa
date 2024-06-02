// Function to handle context menu clicks
async function onClickHandler(info, tab) {
    if (info.menuItemId === "delete-element") {
        const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getURL
        });

        const url = result[0].result;
        console.log(url);

        // Send a message to the content script to copy the URL to the clipboard
        chrome.tabs.sendMessage(tab.id, { action: "copyToClipboard", text: url });
    }
}

// Function to get the URL
function getURL() {
    if (document.activeElement) {
        const e = document.activeElement;
        var url = `${location.origin}${location.pathname}?aw-goto=${e.tagName}.${e.className.split(' ').join('.')}`;
        return url;
    }
    return '';
}

// Create context menu items
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "Aioewa",
        title: "Aioewa",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "delete-element",
        parentId: "Aioewa",
        title: "Create Link",
        contexts: ["all"]
    });

    // Add more items as needed
});

// Add listener for context menu click events
chrome.contextMenus.onClicked.addListener(onClickHandler);
