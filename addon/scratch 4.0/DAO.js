export function DAO({input, addon, console}) {
    if(location.host != "scratch.mit.edu") return null
    switch (input) {
        case "css":
            return "main.css"
            break;
        case "js":
            return "main.js"
            break;
        default:
            return null
            break;
    }
}