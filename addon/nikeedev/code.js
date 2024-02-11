export default async function({addon, tab, console}) {
    console.log("This message shows only on 'nikeedev.stio.studio'");
    console.log("nikee:", await (await addon.storage.sync.get(null)).addonsEnabled)
}