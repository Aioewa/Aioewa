export async function onTab({ addon, console }) {
    ; (async () => {
        const dl = document.createElement("dl")
        dl.className = "logo"
        const dt = document.createElement("dt")
        const logoLink = document.createElement("a")
        logoLink.ariaLabel = "Scratch"
        logoLink.href = "/"
        dl.append(dt)
        dt.append(logoLink);
        await (await addon.tab.waitForElement("#footer .lists")).insertAdjacentElement("afterbegin", dl)
    })();

    // [
    //     "FeaturedProjects",
    //     "FeaturedStudios",
    //     "ProjectCuratedByScratcher",
    //     "ScratchDesignStudio",
    //     "LovedByScratchersImFollowing",
    //     "WhatTheCommunityIsRemixing",
    //     "WhatTheCommunityIsLoving",
    // ].forEach((e, i) => {
    //     addon.tab.waitForElement(`:nth-child(n+${i} of .box .box-header h4)`).then((element) => {
    //         element.classList.add(e)
    //     })
    // })

}