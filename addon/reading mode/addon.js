export async function onTab({addon, console}) {
    await addon.tab.listenForElements("body", (...e)=>{
        console.log(...e)
    })
    // const body = await addon.tab.waitForElement("body")
    // console.log(body)
    // console.log(body.innerText)
}