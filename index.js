let popup = ( (window.innerHeight == 450) && (window.innerWidth == 300) )

function openPage (_url, _openNew = false){
    if (_openNew == false) window.location = _url
    else open(_url)
}

function onClickOpen(_element, _url, _openNew = false) {
    _element.addEventListener("click", ()=>{
        openPage(_url, _openNew)
    })
}

const elements = {
    fullPage: document.querySelector(".full-page")
}

onClickOpen(elements.fullPage, "./index.html", true)
