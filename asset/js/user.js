const [rem] = await aw.getJSON("../../user.json")
// console.log(rem.about);

function displayUser(userID) {
        userID = users.map(function(o) { return o.userID; }).indexOf(userID);
        let user = users[userID]
        let html = '<section class="userDisplay"><div class="user"><div class="text"><span class="displayname" id="displayname">programordie</span><span class="username" id="username">@programordie</span></div><img class="userlogo" id="userlogo" src="https://pod.stio.studio/static/img/pod.png"></div><p class="about" id="about"></p><h3>Links:</h3><div class="links" id="links"><a href="#" title="Github">Github</a><span> - </span><a href="#" title="Email">Email</a></div></section>'
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        doc.getElementById('username').innerHTML = '@' + user.username;
        doc.getElementById('displayname').innerHTML = user.displayName;
        doc.getElementById('userlogo').src = user.profilePicture;
        doc.getElementById('about').innerHTML = user.about;
        let links = "";
        user.links.forEach(l => {
            if (l.url) {
                if (!l.text) {
                    l.text = '';
                }
                let img = '';
                if (l.img) {
                    img = '<img alt="'+l.text+'" src="'+l.img+'">';
                }
                let clink = '<span> - </span><a href="'+ l.url +'" title="'+ l.text +'">'+img+l.text+'</a>';
                links += clink;
            }
        });
        doc.getElementById('links').innerHTML = links.replace('<span> - </span>', '', 1);

    return doc.querySelector('section'));

document.querySelector(".content").appendChild(displayUser(3));
