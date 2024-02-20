export async function DAO({addon, input}) {
    if (addon.settings?.["how important?"] == "If it is not defined") {
        return "1.css"
    }
    return "2.css"
}