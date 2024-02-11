// const arrows = document.querySelectorAll(".arrow")
// arrows.forEach((e)=>{
//     // document.createElement("div")
//     e.addEventListener("pointerdown", (a)=>{
//         e.parentElement.classList.contains("active") ? e.parentElement.classList.remove("active") : e.parentElement.classList.add("active")
//     })

// })

let settings_id = [];
function createElement(_name, _description, _id) {
    let _elements = document.createElement("div");

    let element;
    if (!Array.isArray(_description)) {
        element = document.createElement("span");
        element.innerText = _description;
        _elements.appendChild(element);
    } else {
        _description.forEach((array) => {
            let data = array[1];
            // console.log(data);
            switch (array[0]) {
                case "text":
                    element = document.createElement("span");
                    element.innerText = data;
                    _elements.appendChild(element);
                    break;
                case "number":
                    element = document.createElement("input");
                    element.type = "number";
                    element.id = data;
                    settings_id.push(element.id);
                    _elements.appendChild(element);
                    break;

                case "field":
                    element = document.createElement("input");
                    element.type = "text";
                    element.id = data;
                    settings_id.push(element.id);
                    _elements.appendChild(element);
                    break;

                case "br":
                    _elements.appendChild(document.createElement("br"));
                    break;

                case "dropdown":
                    element = document.createElement("select");
                    element.id = data.name;
                    settings_id.push(element.id);
                    data.options.forEach((option) => {
                        let temp = document.createElement("option");
                        temp.value = option;
                        temp.text = option;
                        element.appendChild(temp);
                    });
                    _elements.appendChild(element);

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
    <h3>${_name}</h3>
    <div class="content">
    ${_elements.innerHTML
        }
    </div>
    <label tabindex="0"  class="switch"><input tabindex="-1" type="checkbox"></label>
</div>
    `)
    rem = rem.querySelector(".addon")
    return rem
}
// console.log(createAddonSettings("a", {_name: "hello there"}))
const info = await aw.getInfo()
let elements = {}
const enabled = await aw.storage.getAddonsEnabled()
// console.log(aw)
// console.log(enabled)
info.forEach(async (e) => {
    // console.log(e);
    const rem = createElement(e.name, e.description, e.id)
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
        rem._addonChanged = [e.id, rem[e.id]]
        aw.storage.setAddonsEnabled(rem)
    });

    // Check trough all changes in the elements that are used for settings for that addon:
    settings_id.forEach((elem) => {
        let rem = document.getElementById(elem);

        rem.addEventListener("change", async (a) => {
            const storageValue = await aw.storage.getAddonSettings() || {}
            storageValue[elem] = rem.value;
            aw.storage.setAddonSettings(storageValue);
        })
    });

})
chrome.storage.sync.onChanged.addListener((e) => {
    const rem = Object.values(e)[0]
    elements[rem.newValue._addonChanged[0]] != undefined ? elements[rem.newValue._addonChanged[0]].input.checked = rem.newValue._addonChanged[1] : undefined
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