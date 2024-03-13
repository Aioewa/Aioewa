export async function onTab({addon, console}) {
    const dl = document.createElement("dl")
    dl.className = "logo"
    const dt = document.createElement("dt")
    const logoLink = document.createElement("a")
    logoLink.ariaLabel = "Scratch"
    logoLink.href = "/"
    dl.append(dt)
    dt.append(logoLink)
    await (await addon.tab.waitForElement("#footer .lists")).insertAdjacentElement("afterbegin", dl)
}