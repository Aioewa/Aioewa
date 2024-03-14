
async function getActiveTab() {
    return await (await chrome.tabs.query({ active: true, currentWindow: true }))[0]
}

async function getCookies() {
    const cookieString = await (await chrome.scripting.executeScript({
        target: { tabId: await (await getActiveTab()).id, allFrames: true },
        func: () => { return document.cookie },
    }))[0].result

    const cookieObject = {}
    cookieString.split('; ').forEach(cookie => {
        const [name, ...value] = cookie.split('=')
        cookieObject[name] = value.join('=')
    })

    return cookieObject
}

async function getLocalStorage() {
    return await (await chrome.scripting.executeScript({
        target: { tabId: await (await getActiveTab()).id, },
        func: () => {
            const rem = {}
            Object.keys(localStorage).forEach((e) => {
                rem[e] = localStorage.getItem(e)
            })
            return rem
        },
    }))[0].result
}

async function setLocalStorage(oldKey, newKey, value) {
    await (await chrome.scripting.executeScript({
        target: { tabId: await (await getActiveTab()).id, },
        func: (oldKey, newKey, value) => {
            localStorage.removeItem(oldKey)
            localStorage.setItem(newKey, value)
        },
        args: [oldKey, newKey, value]
    }))[0].result
}
async function setCookie(oldKey, newKey, value) {
    await (await chrome.scripting.executeScript({
        target: { tabId: await (await getActiveTab()).id, },
        func: (oldKey, newKey, value) => {
            document.cookie = `${oldKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
            document.cookie = `${newKey}=${value}`
        },
        args: [oldKey, newKey, value]
    }))[0].result
}

async function siteToCookie() {
    const cookies = await getCookies();
    const table = createTable(cookies)
    keysContainer.replaceWith(table.keysContainer)
    keysContainer = document.querySelector("table")
    table.values.forEach((value) => {
        let key = value.tdKeyInput.value
        value.tdKeyInput.addEventListener("input", (ev) => {
            setCookie(key, value.tdKeyInput.value, value.tdValueInput.value)
            key = value.tdKeyInput.value
        })
        value.tdValueInput.addEventListener("input", (ev) => {
            setCookie(key, value.tdKeyInput.value, value.tdValueInput.value)
            key = value.tdKeyInput.value
        })
    })
}

async function siteToLocalStorage() {
    const localStorage = await getLocalStorage();
    const table = createTable(localStorage)
    keysContainer.replaceWith(table.keysContainer)
    keysContainer = document.querySelector("table")
    table.values.forEach((value) => {
        let key = value.tdKeyInput.value
        value.tdKeyInput.addEventListener("input", (ev) => {
            setLocalStorage(key, value.tdKeyInput.value, value.tdValueInput.value)
            key = value.tdKeyInput.value
        })
        value.tdValueInput.addEventListener("input", (ev) => {
            setLocalStorage(key, value.tdKeyInput.value, value.tdValueInput.value)
            key = value.tdKeyInput.value
        })
    })
}

const editorBox = document.createElement('div');

const switchToCookiesButton = document.createElement('button');
switchToCookiesButton.textContent = 'Get Cookies';
switchToCookiesButton.addEventListener('click', siteToCookie);

const switchToLocalStorageButton = document.createElement('button');
switchToLocalStorageButton.textContent = 'Get Local Storage';
switchToLocalStorageButton.addEventListener('click', siteToLocalStorage);

let keysContainer = document.createElement('table');
let tbody = document.createElement('tbody');
keysContainer.appendChild(tbody);

function createTable(_table) {
    const keysContainer = document.createElement('table');
    const tbody = document.createElement('tbody');
    keysContainer.appendChild(tbody);
    const values = []
    Object.keys(_table).forEach((key) => {
        const tr = document.createElement('tr');
        // tr.append(document.createElement("br"));
        const tdKey = document.createElement('td')
        tdKey.className = "tdKey"
        const tdKeyInput = document.createElement("textarea")
        tdKeyInput.value = key;
        tdKey.append(tdKeyInput);
        tr.appendChild(tdKey);
        const tdValue = document.createElement('td')
        tdValue.className = "tdValue"
        const tdValueInput = document.createElement("textarea")
        tdValueInput.value = _table[key];
        tdValue.append(tdValueInput);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
        values.push({ tdKey, tdValue, tdKeyInput, tdValueInput })
    });
    return { keysContainer, values }
}
editorBox.append(switchToCookiesButton, switchToLocalStorageButton);
editorBox.appendChild(keysContainer);
document.body.append(editorBox);


siteToCookie()