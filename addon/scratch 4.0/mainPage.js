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

    // class rem {
    //     static scratchMessage(key) {
    //         console.log(key)
    //         if (this.editorMode && this.redux.state) {
    //             if (this.redux.state.locales.messages[key]) {
    //                 return this.redux.state.locales.messages[key];
    //             }
    //         }
    //         const locales = [window._locale ? window._locale.toLowerCase() : "en"];
    //         if (locales[0].includes("-")) locales.push(locales[0].split("-")[0]);
    //         if (locales.includes("pt") && !locales.includes("pt-br")) locales.push("pt-br");
    //         if (!locales.includes("en")) locales.push("en");
    //         for (const locale of locales) {
    //             if (window._messages[locale] && window._messages[locale][key]) {
    //                 return window._messages[locale][key];
    //             }
    //         }
    //         console.warn("Unknown key: ", key);
    //         return "";
    //     }
    // }

    // ;[
    //     "splash.communityLoving",
    //     "splash.communityRemixing",
    //     "splash.featuredProjects",
    //     "splash.featuredStudios",
    //     "splash.projectsByScratchersFollowing",
    //     "splash.projectsCuratedBy",
    //     "splash.projectsInStudiosFollowing",
    //     "splash.projectsLovedByScratchersFollowing",
    //     "splash.scratchDesignStudioTitle",
    //     "splash.visitTheStudio"
    // ].forEach(e => {
    //     // console.log(rem.scratchMessage(e))
    // });


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