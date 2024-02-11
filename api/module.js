// class scripts {
//     #scripts
//     scripts = new Proxy(this.#scripts, {
//         get: (target, string, receiver)=>{
//             console.log(target, string, receiver)
//             return true
//         }
//     })
// } 

export async function getInfo(_url = null) {
    const addons = await(await aw.getJSON(chrome.runtime.getURL("../../addon/addon.json")))
    let rem = []
    addons.forEach(async (e)=>{
        const rem_a = await aw.getJSON(chrome.runtime.getURL(`../../addon/${e}/info.json`))
        rem_a.id = e
        rem.push(rem_a)
    })
    await new Promise(async (resolve, reject) => {  
        const update = ()=>{
            if(rem.length == addons.length) {
                resolve(true)
            }
            else {
                requestAnimationFrame(update)
            }
        }
        update()

    })
    return rem
}

export async function infoCodeRunner(_type, _info, _path, output = {self: true, console: true}) {
    const rem = Array.isArray(_info) ? _info : [_info]
    const rem_a = {}
    rem.forEach(async (b)=>{
        const rem_b = await getScript(chrome.runtime.getURL(`../../addon/${_path}/${b}`))
        rem_a[b] = rem_b
        output.self == true ? delete output.self : output.self = rem_b
        output.console == true ? delete output.console : output.console = {..._realConsole, ...easyCreateConsole(_path, b)}
        // console.log(output)
        try {
            rem_b[_type](output)
        }
        catch (error) {
            console.error(`Function ${_type} is not defined\nFile: ${chrome.runtime.getURL(`../../addon/${_path}/${b}`)}`)
        }
    })
    await new Promise((resolve, reject) => {
        const update = ()=>{
            // console.log(rem, Object.keys(rem_a))
            if (rem.length == Object.keys(rem_a).length) {
                resolve(addons)
            }
            else {
                requestAnimationFrame(update)
            }
        }
        update()
    })
    return rem_a
}
export async function getScript(_url) {
    return (await Promise.all([
        import(_url)
    ]))[0];
}
export async function getJSON(_url) {
    return (await fetch(_url)).json();
}
export const _realConsole = console
export const consoleOutput = (logAuthor = "[page]") => {
    const style = {
      // Remember to change these as well on cs.js
      leftPrefix: "background:  #055b50; color: white; border-radius: 0.5rem 0 0 0.5rem; padding: 0 0.5rem",
      rightPrefix:
        "background: #222; color: white; border-radius: 0 0.5rem 0.5rem 0; padding: 0 0.5rem; font-weight: bold",
      text: "",
    };
    return [`%cAioewa%c${logAuthor}%c`, style.leftPrefix, style.rightPrefix, style.text];
}
export const createConsole = {
    log: (e) => _realConsole.log.bind(_realConsole, ...consoleOutput(e)),
    error: (e) => _realConsole.error.bind(_realConsole, ...consoleOutput(e)),
    _realConsole,
}
export function easyCreateConsole(..._name) {
    let rem = `${_name[0]}`;
    _name.shift()
    _name.forEach((e)=>{
        rem += ` : ${e}`
    })
    return {
        log: createConsole.log(rem),
        error: createConsole.error(rem),
        _realConsole,
    }
}
const localConsole = {
    log: createConsole.log(`api module`),
    error: createConsole.error(`api module`),
}

// if(await(await chrome.storage.sync.get(null)).settings == undefined) {
//     chrome.storage.sync.set({settings: {}})
// }

export const storage = {
    async getAddonsEnabled(_get = null) {
        if (_get == null) {
            return (await chrome.storage.sync.get("addonsEnabled")).addonsEnabled
        }
        else {
            return (await chrome.storage.sync.get("addonsEnabled")).addonsEnabled[_get]
        }
    },
    setAddonsEnabled(set) {
        chrome.storage.sync.set({addonsEnabled: set})
    },
}

// storage.raw.hello = "aosfjoaihh"
// console.log(await storage.raw.hello)
// console.log(await storage.raw)
// storage.set({"hello": "wow", "asjofh": "ajjf", "1208": "oisaf"})
// console.log(await settings.get("hello"))
// console.log(await chrome.storage.sync.get(null))
