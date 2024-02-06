// class scripts {
//     #scripts
//     scripts = new Proxy(this.#scripts, {
//         get: (target, string, receiver)=>{
//             console.log(target, string, receiver)
//             return true
//         }
//     })
// } 

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
    }
}
const localConsole = {
    log: createConsole.log(`api module`),
    error: createConsole.error(`api module`),
}

if(await(await chrome.storage.sync.get(null)).settings == undefined) {
    chrome.storage.sync.set({settings: {}})
}

export const storage = {
    get(_get) {
        return new Promise(async (resolve, reject) => {
            resolve(await(await chrome.storage.sync.get(null))[_get])
        })
    },
    set(_set) {
        chrome.storage.sync.set(_set)
    },
    raw: new Proxy(await(await chrome.storage.sync.get(null)), {
        set: (_target, _string, _receiver)=>{
            storage.set({[_string]: _receiver})
            return true
        },
        deleteProperty: (_target, _string)=>{
            console.log(_target, _string)
        },
    }),
}

// storage.raw.hello = "aosfjoaihh"
// console.log(await storage.raw.hello)
// console.log(await storage.raw)
// storage.set({"hello": "wow", "asjofh": "ajjf", "1208": "oisaf"})
// console.log(await settings.get("hello"))
// console.log(await chrome.storage.sync.get(null))
