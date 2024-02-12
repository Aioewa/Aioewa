export function onTab({ addon, tab, console }) {

    const styleSrc = '._stats_container:hover{cursor:grab}._stats_container.dragging{cursor:grabbing;scale:1.05;box-shadow:3px 3px 1em rgba(0, 0, 0, 0.6)}._stats_container{backdrop-filter:blur(2px);max-height: 150px;transition: all 0.4s ease,top 0s,left 0s,bottom 0s,right 0s;z-index: 999999;position:fixed;top:5px;left:5px;overflow: hidden;background:#222222de;width:fit-content;border-radius:5px;box-shadow:2px 2px 8px rgba(0,0,0,.3)}._stats_container canvas{width:130px;max-height:150px;transition:.4s ease-out}._stats_container ._stats_header{user-select:none;font: unset !important;background-color:#00000052;height:15px;display:flex;align-items:center;justify-content:left;color:#ffffff5b;font-size:.6em !important;font-family:Arial,Helvetica,sans-serif !important;font-weight:600 !important}._stats_container ._stats_header ._stats_arrow input{width:0;height:0;opacity:0}._stats_container ._stats_header ._stats_arrow{width:10px;height:10px;opacity:.4;transition:.4s;margin-left:3px;margin-right:3px;background-color:rgba(255,255,255,.2);border-radius:3px; background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE2LjU5IDguNTkgMTIgMTMuMTcgNy40MSA4LjU5IDYgMTBsNiA2IDYtNnoiLz48L3N2Zz4=");background-position:center;background-repeat:no-repeat;background-size:12px}._stats_container ._stats_header ._stats_arrow span{margin-top:6px}._stats_container ._stats_header ._stats_arrow:has(input:checked){rotate:-90deg}._stats_container:has(._stats_arrow input:checked) {max-height:15px}._stats_container ._stats_header ._stats_arrow span{margin-top:6px}._stats_container ._stats_header ._stats_arrow:hover{cursor:pointer}';
    const style = document.createElement('style');
    style.innerHTML = styleSrc;
    document.head.appendChild(style);

    console.log('styles added');

    const container = document.createElement('div');
    container.className = '_stats_container'

    container.innerHTML = '<div class="_stats_header"><label class="_stats_arrow"><input type="checkbox"></label>FPS:&nbsp;<span id="_stats_info">60</span></div><canvas>This browser doesn\'t support canvas!</canvas>';
    const canvas = container.querySelector('canvas');

    const ctx = canvas.getContext('2d')
    canvas.height = 183;
    canvas.width = 320;

    let data = [];
    let lastUpdate = (new Date).getTime();
    let frames = 0;
    let minFPS = 100;
    let maxFPS = 0;

    let transition = 0;

    let offsetX, offsetY
    let isDragging = false;

    function drawGraph(data) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        transition /= 1.1;

        const heightFactor = 2;
        const width = 30;
        const offset = 35;
        const dotOffset = offset + transition * width;
        const heightOffset = 32;

        for (var idx = 0; idx < 10; idx++) {
            ctx.beginPath();
            ctx.moveTo(offset + width * idx, (canvas.height - heightOffset) - 75 * heightFactor);
            ctx.lineTo(offset + width * idx, canvas.height - heightOffset);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#555';
            ctx.stroke();

            ctx.font = "19px Arial";
            ctx.fillStyle = "#666";
            ctx.textAlign = "center";
            ctx.fillText(idx, offset + width * idx, canvas.height - (heightOffset - 20));
        }
        for (var idx = 0; idx < 6; idx++) {
            ctx.beginPath();
            ctx.moveTo(offset, canvas.height - (heightFactor * 15 * idx) - heightOffset);
            ctx.lineTo(9 * width + offset, canvas.height - (heightFactor * 15 * idx) - heightOffset);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#555';
            ctx.stroke();

            if (idx < 5) {
                ctx.font = "18px Arial";
                ctx.fillStyle = "#666";
                ctx.textAlign = "end";
                ctx.fillText((idx) * 15, offset - 10, canvas.height - (heightFactor * 15 * idx) + 5 - heightOffset);
            }
        }

        var idx = 0;
        ctx.lineWidth = 2;

        data = data.slice();
        data.reverse();
        data.forEach(d => {
            var currentOffset = dotOffset;
            if (idx === 0) {
                currentOffset = offset;
            }
            var cidx = idx;
            var tran = 1;
            if (cidx === 0) {
                cidx = 1;
                tran = (1 - (-transition))
            }
            if (cidx === 1) {
                cidx = 2;
            }

            ctx.beginPath();
            ctx.moveTo(dotOffset + width * (cidx - 1), canvas.height - (data[cidx - 1] * heightFactor) - heightOffset);
            ctx.lineTo(currentOffset + width * idx, canvas.height - (d * heightFactor) * tran - heightOffset);
            ctx.strokeStyle = "orange"
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(currentOffset + width * idx, canvas.height - ((d * heightFactor)) * tran - heightOffset, 6, 0, 2 * Math.PI);
            ctx.fillStyle = "orange";
            ctx.fill();

            idx++;
        });
    }

    function update() {
        if ((new Date()).getTime() > lastUpdate + 1000) {
            lastUpdate = (new Date).getTime();
            data.push(frames);
            if (data.length > 10) {
                data.splice(0, 1);
            }
            if (frames < minFPS) {
                minFPS = frames;
            }
            if (frames > maxFPS) {
                maxFPS = frames;
            }
            document.getElementById('_stats_info').innerHTML = frames + ' (' + minFPS + ' - ' + maxFPS + ')'
            frames = 0;
            transition = -1;

        }
        frames++;
    }

    function loop() {
        requestAnimationFrame(loop);
        update();
        drawGraph(data);
    }
    loop();

    setTimeout(function () {
        document.body.appendChild(container)
    }, 50);
    console.log("container added");


    container.addEventListener('mousedown', (e) => {
        container.classList.add('dragging')
        offsetX = e.clientX - container.getBoundingClientRect().left;
        offsetY = e.clientY - container.getBoundingClientRect().top;
        isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;

            container.style.left = x + 'px'
            container.style.top = y + 'px'
        }
    })

    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            container.classList.remove('dragging')
            isDragging = false;
        }
    });
}