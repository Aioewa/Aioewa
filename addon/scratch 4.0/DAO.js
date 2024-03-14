export function DAO({ input, addon, console }) {
    if (location.host != "scratch.mit.edu") return null
    if (location.pathname == "/") {
        switch (input) {
            case "css":
                return "mainPage.css"
                break;
            case "js":
                return "mainPage.js"
                break;
            default:
                return null
                break;
        }
    }
    if (location.pathname.startsWith("/users/")) {
        switch (input) {
            case "css":
                return "users.css"
                break;
            case "js":
                return "users.js"
                break;
            default:
                return null
                break;
        }
    }
}