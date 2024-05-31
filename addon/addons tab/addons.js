// const arrows = document.querySelectorAll(".arrow")
// arrows.forEach((e)=>{
//     // document.createElement("div")
//     e.addEventListener("pointerdown", (a)=>{
//         e.parentElement.classList.contains("active") ? e.parentElement.classList.remove("active") : e.parentElement.classList.add("active")
//     })

// })

// let settings_id = [];

async function createElement(_name, _description, _id, _storage) {
    let _elements = aw.fullParserCreator(_description, _storage, _id)

    let rem = document.createElement("div");
    rem.style.display = "content"


    rem.insertAdjacentHTML("beforeend", `
<div class="addon addon-${_id}">
    <label tabindex="0"  class="arrow"><input tabindex="-1" type="checkbox"></label>
    <label tabindex="0"  class="type"></label>
    <h3 class="title">${_name}</h3>
    <div class="content">
    </div>
    <label tabindex="0"  class="settings"><input tabindex="-1" type="checkbox"></label>
    <label tabindex="0"  class="switch"><input tabindex="-1" type="checkbox"></label>
</div>
<div class="settingsPopup">
    <h3>${_name}</h3>
    <div class="close">X</div>
    <iframe addon-id="${_id}" src="./settings.html"></iframe>
</div>

    `)
    // rem = rem.querySelector(".addon")
    _elements.className = "content"
    rem.querySelector(".content").append(_elements)

    const settingsInput = rem.querySelector(".settings input");
    const closeBtn = rem.querySelector(".settingsPopup .close");

    // Close settingsPopup when the close button is clicked
    closeBtn.addEventListener("click", () => {
        settingsInput.checked = false;
        hideAllSettingsPopups();
    });

    // Manage state of all settings popups
    settingsInput.addEventListener("change", () => {
        if (settingsInput.checked) {
            hideAllSettingsPopups();
            settingsInput.checked = true; // Keep the current one open
        }
    });

    return rem;
}

function hideAllSettingsPopups() {
    document.querySelectorAll('.addon .settings input').forEach(input => {
        input.checked = false;
    });
}
// console.log(createAddonsSettings("a", {_name: "hello there"}))
const info = await aw.get.info()
let elements = {}
// const addonsEnabled = await aw.storage.getAddonsEnabled()
// const addonsSettings = await aw.storage.getAddonsSettings()

// console.log(aw)
// console.log(enabled)

function returnIconUrl(iconName) {
    switch (iconName) {
        case "tab":
            return "../icons/popup.svg"
            break;

        case "theme":
            return "../icons/brush.svg"
            break;
            
        case "toy":
            return "../icons/puzzle.svg"
            break;
            
        case "web":
            return "../icons/web.svg"
            break;
            
        case "tool":
            return "../icons/wrench.svg"
            break;
            
        default:
            return "../icons/question-mark.svg"
            break;
    }
}

info.forEach(async (e) => {
    if (e.hide) return
    const rem = await createElement(await aw.DAO(e.name, e), await aw.DAO(e.description, e), e.id, addonsSettings?.[e.id])    
    rem.style.setProperty("--type-icon-url", `url(${returnIconUrl(e.type)}`)
    document.body.append(rem)

    const label = rem.querySelector(".switch")
    const input = label.querySelector("input")
    elements[e.id] = { elm: rem, label: label, input: input }

    // console.log(e.id)
    try {
        input.checked = addonsEnabled[e.id]
    }
    catch {
        input.checked = false
    }

    label.addEventListener("change", async (a) => {
        const rem = await aw.storage.getAddonsEnabled() || {}
        rem[e.id] = input.checked
        rem._addonChanged = {
            type: "addonsEnabled",
            change: [e.id, rem[e.id]]
        }
        aw.storage.setAddonsEnabled(rem)
    });

    // Check trough all changes in the elements that are used for settings for that addon:
    // settings_id.forEach((elem) => {
    //     let rem = document.getElementById(elem);

    //     rem.addEventListener("change", async (a) => {
    //         const storageValue = await aw.storage.getAddonsSettings() || {}
    //         storageValue[elem] = rem.value;
    //         aw.storage.setAddonsSettings(storageValue);
    //     })
    // });

})
chrome.storage.sync.onChanged.addListener((e) => {
    const rem = Object.values(e)[0]
    console.log(e)
    if(rem.newValue == undefined) {
        Object.keys(elements).forEach((a)=>{
            elements[a].input.checked = false
        })
    }
    else {
        // console.log(rem.newValue._addonChanged.type)
        switch (rem.newValue?._addonChanged?.type) {
            case "addonsEnabled":
                // console.log(elements[rem.newValue._addonChanged.change[0]])
                elements[rem.newValue._addonChanged.change[0]] != undefined ? elements[rem.newValue._addonChanged.change[0]].input.checked = rem.newValue._addonChanged.change[1] : undefined
                break;
            case "addonsSettings":
                // console.log(settingElements[rem.newValue._addonChanged.change.value[0]].value, rem.newValue._addonChanged.change.value[1])
                if (aw.settingElements[rem.newValue._addonChanged.change.value[0]] != undefined) {
                    aw.settingElements[rem.newValue._addonChanged.change.value[0]].value = rem.newValue._addonChanged.change.value[1]
                }
                break;
            
            default:
                break;
        }
    }
})

// const label = document.querySelectorAll(".addon label")
// let div = document.createElement("label")
// label.forEach((e)=>{
//     div.addEventListener("keydown", (a)=>{
//         console.log(e)
//         if (a.key == " " || a.key == "Enter") {
//             e.querySelector("input").checked ? e.querySelector("input").checked = false : e.querySelector("input").checked = true
//         }
//     })
// })