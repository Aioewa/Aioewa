const element = document.querySelector(".tabs")
const addonsIframe = document.querySelector("#addons-iframe")
const tab = document.createElement("button")
addonsIframe.src = `/addon/addons tab/addons.html`

if (addonsEnabled != undefined) {
    Object.keys(addonsEnabled).forEach(async (e)=>{
        if(!addonsEnabled[e]) return
        const rem = await aw.get.JSON(chrome.runtime.getURL(`../../addon/${e}/info.json`))
        rem.id = e
        await(await aw.DAO(rem?.tabs, rem))?.forEach(a => {
            // console.log(a)
            const newTab = tab.cloneNode(true)
            newTab.innerText = a.title
            // document.createElement("div").
            newTab.addEventListener("pointerdown", ()=>{
                if (decodeURIComponent(addonsIframe.src) != decodeURIComponent(aw.get.URL(`/addon/${e}/${a.html}`))) {
                    addonsIframe.src = `/addon/${e}/${a.html}`
                }
            })
            element.append(newTab)
        });
    })
}