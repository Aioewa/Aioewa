export function onTab({ addon, tab, console}) {
    const url = chrome.runtime.getURL('addon/' + addon.info.id + '/newStyle.css'); // Load the style URL

    // v Add the style to the site
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    document.head.appendChild(link);
}
