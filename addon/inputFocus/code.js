export async function onTab({ addon, tab, console }) {
    const rem = await addon.settings.inputs
    if (rem === undefined) return
    rem.split("\n").forEach(async (a) => {
        const element = await addon.tab.waitForElement(a)
        addEventListener("keydown", (e)=>{
            if(e.shiftKey && e.key == "/") {
                requestAnimationFrame(()=>{
                    element.focus()
                })
            }
        })        
    });
}