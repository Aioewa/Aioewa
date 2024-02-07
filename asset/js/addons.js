// const arrows = document.querySelectorAll(".arrow")
// arrows.forEach((e)=>{
//     // document.createElement("div")
//     e.addEventListener("pointerdown", (a)=>{
//         e.parentElement.classList.contains("active") ? e.parentElement.classList.remove("active") : e.parentElement.classList.add("active")
//     })

// })
function addon(_name, _description, _id) {
    let rem = document.createElement("div");
    rem.insertAdjacentHTML("beforeend", `
<div class="addon addon-${_id}">
    <label tabindex="0"  class="arrow"><input tabindex="-1" type="checkbox"></label>
    <h3>${_name}</h3>
    <div class="content">${_description}</div>
    <label tabindex="0"  class="switch"><input tabindex="-1" type="checkbox"></label>
</div>
    `)
    rem = rem.querySelector(".addon")
    return rem
}
const info = []
await new Promise(async (resolve, reject) => {  
    const addons = await(await aw.getJSON(chrome.runtime.getURL("../../addon/addon.json")))
    addons.forEach(async (e)=>{
        info.push(await aw.getJSON(chrome.runtime.getURL(`../../addon/${e}/info.json`)))
        if(e == addons[addons.length-1]) {
            resolve(true)
        }
    })
})
console.log(info)
info.forEach(async (e)=>{
    const rem = addon(e.name, e.description, e.id)
    document.body.append(rem)

    const label = rem.querySelector(".switch")
    const input = label.querySelector("input")

    if (await(await chrome.storage.sync.get(null))[e.id] == undefined) {
        chrome.storage.sync.set({[e.id]: {name: e.name, enabled: false}})
    }
    input.checked = await(await chrome.storage.sync.get(null))[e.id].enabled
    
    label.addEventListener("change", (a)=>{
        chrome.storage.sync.set({[e.id]: {name: e.name, enabled: input.checked}})
    })
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