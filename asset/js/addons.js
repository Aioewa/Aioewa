const arrows = document.querySelectorAll(".arrow")
arrows.forEach((e)=>{
    // document.createElement("div")
    e.addEventListener("pointerdown", (a)=>{
        e.parentElement.classList.contains("active") ? e.parentElement.classList.remove("active") : e.parentElement.classList.add("active")
    })
})