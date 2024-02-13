const [rem] = await aw.getJSON("../../user.json")
// console.log(rem.about);
function br() {
    document.documentElement.append(document.createElement("br"));
}
document.documentElement.append(aw.fullParserCreator(rem.displayName));
br()
document.documentElement.append(aw.fullParserCreator("@" + rem.username));
br()
document.documentElement.append(aw.parserCreator(
    ["image", {
        "src": rem.profilePicture,
        "height": 100,
        "width": 100
    }]
).element);
br()
document.documentElement.append(aw.fullParserCreator(rem.about));