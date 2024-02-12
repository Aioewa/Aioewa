// const arrows = document.querySelectorAll(".arrow")
// arrows.forEach((e)=>{
//     // document.createElement("div")
//     e.addEventListener("pointerdown", (a)=>{
//         e.parentElement.classList.contains("active") ? e.parentElement.classList.remove("active") : e.parentElement.classList.add("active")
//     })

// })

// let settings_id = [];

async function changeOrAddSetting(insideOf, setting, value) {
    const rem = await aw.storage.getAddonsSettings() || {}
    if (rem?.[insideOf] == undefined) {
        rem[insideOf] = {}
    }
    rem[insideOf][setting] = value
    rem._addonChanged = {
        type: "addonsSettings",
        change: {
            name: [insideOf], 
            value: [setting, value]
        }
    }
    aw.storage.setAddonsSettings(rem)
}
const settingElements = {}
async function createElement(_name, _description, _id, _storage) {
    // console.log(_storage)
    let _elements = document.createElement("div");

    if (!Array.isArray(_description)) {
        const element = document.createElement("span");
        element.innerText = _description;
        _elements.append(element);
    } else {
        _description.forEach((array) => {
            let data = array[1];
            // console.log(data);
            let element;
            switch (array[0]) {
                case "text":
                    element = document.createElement("span");
                    element.innerText = data;
                    _elements.append(element);
                    break;
                case "link":
                    element = document.createElement("a");
                    element.innerText = data.text;
                    element.href = data.url;
                    element.target = "_blank"
                    _elements.append(element);
                    break;
                case "number":
                    element = document.createElement("input");
                    element.type = "number";
                    element.id = data;
                    element.addEventListener("input", async (e) => {
                        await changeOrAddSetting(_id, data, element.value)
                    })
                    if(_storage?.[data] != undefined) {
                        element.value = _storage[data]
                    }
                    _elements.append(element);
                    settingElements[data] = element
                    break;

                case "field":
                    element = document.createElement("input");
                    element.type = "text";
                    element.id = data;
                    element.addEventListener("input", async (e) => {
                        await changeOrAddSetting(_id, data, element.value)
                    })
                    if(_storage?.[data] != undefined) {
                        element.value = _storage[data]
                    }
                    _elements.append(element);
                    settingElements[data] = element
                    break;

                case "br":
                    _elements.append(document.createElement("br"));
                    break;

                case "dropdown":                    
                    element = document.createElement("select");
                    element.id = data.name;
                    element.addEventListener("input", async (e) => {
                        await changeOrAddSetting(_id, data.name, element.value)
                    })
                    data.options.forEach((option) => {
                        let temp = document.createElement("option");
                        temp.value = option;
                        temp.text = option;
                        element.append(temp);
                    });
                    if(_storage?.[data.name] != undefined) {
                        element.value = _storage[data.name]
                    }
                    _elements.append(element);
                    settingElements[data.name] = element

                default:
                    // console.error("Description element unknown: %s", array[0]);
                    break;
            }
        });
    }


    let rem = document.createElement("div");


    rem.insertAdjacentHTML("beforeend", `
<div class="addon addon-${_id}">
    <label tabindex="0"  class="arrow"><input tabindex="-1" type="checkbox"></label>
    <h3 class="title">${_name}</h3>
    <div class="content">
    </div>
    <label tabindex="0"  class="switch"><input tabindex="-1" type="checkbox"></label>
</div>
    `)
    rem = rem.querySelector(".addon")
    _elements.className = "content"
    rem.querySelector(".content").replaceWith(_elements)
    return rem
}
// console.log(createAddonsSettings("a", {_name: "hello there"}))
const info = await aw.getInfo()
let elements = {}
const enabled = await aw.storage.getAddonsEnabled()
const addonsSettings = await aw.storage.getAddonsSettings()

// console.log(aw)
// console.log(enabled)

info.forEach(async (e) => {
    const rem = await createElement(e.name, e.description, e.id, addonsSettings?.[e.id])
    document.body.append(rem)

    const label = rem.querySelector(".switch")
    const input = label.querySelector("input")
    elements[e.id] = { elm: rem, label: label, input: input }

    // console.log(e.id)
    try {
        input.checked = enabled[e.id]
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
    // console.log(rem.newValue._addonChanged.type)
    switch (rem.newValue._addonChanged.type) {
        case "addonsEnabled":
            // console.log(elements[rem.newValue._addonChanged.change[0]])
            elements[rem.newValue._addonChanged.change[0]] != undefined ? elements[rem.newValue._addonChanged.change[0]].input.checked = rem.newValue._addonChanged.change[1] : undefined
            break;
        case "addonsSettings":
            // console.log(settingElements[rem.newValue._addonChanged.change.value[0]].value, rem.newValue._addonChanged.change.value[1])
            if (settingElements[rem.newValue._addonChanged.change.value[0]] != undefined) {
                settingElements[rem.newValue._addonChanged.change.value[0]].value = rem.newValue._addonChanged.change.value[1]
            }
            break;
    
        default:
            break;
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