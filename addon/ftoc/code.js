
export async function onTab({ addon, tab, console }) {
    document.body.innerHTML = document.body.outerHTML.replaceAll("° F", "° C")
    document.body.innerHTML = document.body.outerHTML.replaceAll("°F", "° C")

    let text = document.body.innerText;

    let new_index = 0; 
    while (text.indexOf("° C", new_index) != -1) {
        for (i = 0; i < 10; i++) console.log(document.body.innerText[text.indexOf("° C", new_index)-1-i])
        
        new_index = text.indexOf("° C", new_index)
    }
}