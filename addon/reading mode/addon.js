export async function onTab({addon, console}) {
    var first = true
    const text = document.createElement("div")
    text.id = "aioewa-reading-mode"
    await addon.tab.listenForElements("body", (...e)=>{
        const body = e[0]
        if (first) {
            first = false
            document.body.insertAdjacentElement("afterend", text)
        }
        text.textContent = body.innerText
        console.log(text.textContent)
    })
}