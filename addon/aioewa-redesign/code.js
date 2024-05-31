export async function onTab({ addon, tab, console }) {
    let html = document.querySelector("html[type=\"settings\"]");
    console.log(html)
    let style = document.createElement("style"); 
    html.children[0].appendChild(style)

    style = `
    font-family: Consolas !important;
    `;
}