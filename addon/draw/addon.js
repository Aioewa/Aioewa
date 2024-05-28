export async function onTab({addon, console}) {
    const doc = await aw.tab.waitForElement("html")
    console.log(doc)
    const pen = document.createElement("div")
    pen.style = `
        position: absolute;
        background-color: red;
        width: 10px;
        height: 10px;
        border-radius: 100vh;
        pointer-events: none;
        z-index: 9999999999999999;
    `
    function draw(e) {
        pen.style.top = e.pageY + "px"
        pen.style.left = e.pageX + "px"
        doc.append(pen.cloneNode(true))
    }
    var penOn = false 
    doc.addEventListener("pointerdown", (e) => {
        penOn = true
        draw(e)
    })
    doc.addEventListener("pointerup", (e) => {
        penOn = false
    })
    doc.addEventListener("pointermove", (e) => {
        if(!penOn) return
        draw(e)
    })
    // aw.forever(async () => {
    //     console.log("Hello")
    //     await aw.wait(1000)
    // })
}