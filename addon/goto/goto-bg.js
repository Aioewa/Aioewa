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
    // Function to generate a CSS selector for an element
    function getElementSelector(element) {
        if (element.id) {
            return `#${element.id}`;
        }
        const path = [];
        while (element.nodeType === Node.ELEMENT_NODE) {
            let selector = element.nodeName.toLowerCase();
            if (element.id) {
                selector += `#${element.id}`;
                path.unshift(selector);
                break;
            } else {
                let sibling = element;
                let nth = 1;
                while (sibling = sibling.previousElementSibling) {
                    if (sibling.nodeName.toLowerCase() === selector) {
                        nth++;
                    }
                }
                if (nth !== 1) {
                    selector += `:nth-of-type(${nth})`;
                }
            }
            path.unshift(selector);
            element = element.parentNode;
        }
        return path.join(" > ");
    }

    if (document.activeElement) {
        const e = document.activeElement;
        e.getElementSelector
        var url = `${location.origin}${location.pathname}?aw-goto=${encodeURIComponent(getElementSelector(e))}`;
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
