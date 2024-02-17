console.log("Background is up and running!")
chrome.runtime.setUninstallURL('https://aioewa.stio.studio/uninstall');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.to != "background" && request.to != "bg") return
    switch (request.type) {
        case "test":
            sendResponse("works? ✅")
            break;

        case "fetch":
            (async ()=>{
                switch (request.outputAs) {
                    case "json":
                        const e = await(await fetch(request.input, request.init)).json()
                        sendResponse(e)
                        break;
                
                    default:
                        break;
                }
            })()
            return true
            break;

        default:
            break;
    }
});
