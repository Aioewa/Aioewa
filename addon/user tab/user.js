const users = await aw.get.JSON("../../users/user.json")
const content = document.querySelector(".content")

/**
 * Asynchronously displays user information based on the provided userID.
 *
 * @param {string} userID - The unique identifier of the user
 * @return {Promise} A Promise that resolves to the user information displayed in a section element
 */
async function displayUser(userID) {
    let user = await aw.get.JSON(`../../users/${userID}/info.json`)
    let doc = document.createElement("section");
    doc.className = "userDisplay";
    let userDiv = document.createElement("div");
    userDiv.className = "user";
    let textDiv = document.createElement("div");
    textDiv.className = "text";
    let displayNameSpan = document.createElement("span");
    displayNameSpan.className = "displayname";
    displayNameSpan.id = "displayname";
    displayNameSpan.textContent = user.displayName;
    let userNameSpan = document.createElement("span");
    userNameSpan.className = "username";
    userNameSpan.id = "username";
    userNameSpan.textContent = '@' + userID;
    let img = document.createElement("img");
    img.className = "userlogo";
    img.id = "userlogo";
    img.src = user.profilePicture;
    let aboutP = document.createElement("p");
    aboutP.className = "about";
    aboutP.id = "about";
    aboutP.append(aw.fullParserCreator(user.about))
    let linksH3 = document.createElement("h3");
    // linksH3.className = "links";
    // linksH3.id = "links";
    linksH3.textContent = "Links:";
    let linksDiv = document.createElement("div");
    linksDiv.className = "links";
    linksDiv.id = "links";
    userDiv.append(textDiv, img);
    textDiv.append(displayNameSpan, userNameSpan);
    doc.append(userDiv, aboutP, linksDiv);
    user.links.forEach(l => {
        if (l.url) {
            let link = document.createElement("a");
            link.href = l.url;
            link.target = "_blank";
            link.title = l.text || '';
            if (l.img) {
                let img = document.createElement("img");
                img.alt = l.text;
                img.src = l.img;
                link.prepend(img);
            }
            link.textContent = l.text;
            let span = document.createElement("span");
            span.textContent = ' - ';
            linksDiv.append(span, link);
        }
    });
    linksDiv.firstElementChild.remove();
    return doc;
}
users.forEach(async (e) => {
    const userHTML = await displayUser(e)
    content.append(userHTML);
})
