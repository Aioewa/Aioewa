// const arrows = document.querySelectorAll(".arrow")
// arrows.forEach((e)=>{
//     // document.createElement("div")
//     e.addEventListener("pointerdown", (a)=>{
//         e.parentElement.classList.contains("active") ? e.parentElement.classList.remove("active") : e.parentElement.classList.add("active")
//     })

// })
function addon(_name, _description) {return `
<div class="addon">
    <label class="arrow"><input type="checkbox"></label>
    <h3>${_name}</h3>
    <div class="content">${_description}</div>
    <label class="switch"><input type="checkbox"></label>
</div>
`}
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
info.forEach((e)=>{
    document.body.insertAdjacentHTML("beforeend", addon(e.name, e.description))
})