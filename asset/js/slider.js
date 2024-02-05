let isDown = false;
let startX;
let scrollLeft;
const slider = document.querySelector('.slider');
// const slider = document.createElement("div")
// addEventListener("pointerdown", (e)=>{
//     e.pointerId
// })
const end = (e) => {
    isDown = false;
    slider.classList.remove('active');
    // slider.releasePointerCapture(e.pointerId)
}

const start = (e) => {
    isDown = true
    slider.classList.add('active');
    startX = e.x
    scrollLeft = slider.scrollLeft;
    slider.setPointerCapture(e.pointerId)
}

const move = (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX || slider.offsetLeft;
    const dist = (x - startX);
    slider.scrollLeft = scrollLeft - dist;
}

(() => {
    slider.addEventListener("pointerdown", start);
    slider.addEventListener("pointermove", move);
    slider.addEventListener("pointerup", end);
})();
