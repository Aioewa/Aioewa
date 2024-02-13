const [rem] = await aw.getJSON("../../user.json")
// console.log(rem.about);
document.querySelector(".content").append(aw.fullParserCreator([
    ["span", {
        class: "displayName",
    }, rem.displayName],
    ["span", {
        class: "username",
    }, "@" + rem.username],
    ["img", {
        "src": rem.profilePicture,
        "class": "profilePicture",
    }],
    ["span", {
        class: "about",
    }, rem.about],
]))

// function br() {
//     document.body.append(document.createElement("br"));
// }
// document.body.append(aw.fullParserCreator(rem.displayName));
// br()
// document.body.append(aw.fullParserCreator("@" + rem.username));
// br()
// document.body.append(aw.parserCreator(
//     ["image", {
//         "src": rem.profilePicture,
//         "height": 100,
//         "width": 100
//     }]
// ).element);
// br()
// document.body.append(aw.fullParserCreator(rem.about));