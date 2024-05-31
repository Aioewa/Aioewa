let addons = null;

function listAddons() {
    if (addons === null) {
        let _addons = []
        addons = document.body.querySelectorAll('.addon');
        // addons = document.querySelector('#addons-iframe').contentWindow.document.body.querySelectorAll('.addon');
        addons.forEach(e => {
            let content = e.querySelector('.content').querySelectorAll('span')
            content = Array.from(content)//.join(' ');
            let result = '';
            content.forEach(el => {
                result = el.innerHTML+' '
            })
            const currentAddon = {name: e.querySelector('.title').innerHTML, desc: result, element: e}
            _addons.push(currentAddon);
        });
        addons = _addons;
    }
}

function search() {
    listAddons();
    // console.log(addons)
    let query = document.getElementById('search').value;
    query = query.replace('.', '');
    query = query.replace(',', '');
    query = query.toLowerCase().split(' ');
    let results = [];
    let pD = '';
    addons.forEach(f => {
        pD = f;
        let p = 0;
        query.forEach(i => {
            p = (f.name.toLowerCase().split(i).length - 1) * 5;
            p += (f.desc.toLowerCase().split(i).length - 1) * 2;
            p += (f.desc.toLowerCase().split(i + ' ').length - 1) * 1;
            p += (f.desc.toLowerCase().split(' ' + i).length - 1) * 1;
        });
        if (p > 0) { results.push([p, pD]); }
    });
    results.sort(function (a, b) { return a[1] - b[1]; });
    let data = []
    results.forEach(key => {
        data.push(key[1])
    });

    addons.forEach(e => {
        e.element.style.display = "none";
    });
    
    data.forEach(e => {
        e.element.style.display = "grid";
    });
}

document.getElementById('search').addEventListener('input', search, false);