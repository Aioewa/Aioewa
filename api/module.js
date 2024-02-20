// class scripts {
//     #scripts
//     scripts = new Proxy(this.#scripts, {
//         get: (target, string, receiver)=>{
//             console.log(target, string, receiver)
//             return true
//         }
//     })
// } 

export async function DAO(_input, _info) {
    return new Promise(async (resolve, reject) => {
        if (_info?.code?.DAO != undefined) {
            const addon = {
                info: _info
            }
            switch (typeof _input) {
                case "string":

                    if (_input.slice(0, 6) == "__DAO_" && _input.slice(_input.length - 2, _input.length) == "__") {
                        const rem = await getScript(chrome.runtime.getURL(`/addon/${_info.id}/${_info.code.DAO}`))
                        addon.self = rem
                        addon.settings = await storage.getAddonsSettings(_info.id)
                        resolve(await DAO(await rem.DAO({ input: _input.slice(6, _input.length - 2), addon}), _info))            
                    }
                    if (_input.slice(0, 6) == "__MSG_" && _input.slice(_input.length - 2, _input.length) == "__") {
                        resolve(await DAO(chrome.i18n.getMessage(_input.slice(6, _input.length - 2))))            
                    }
                    resolve(_input)
                    break;
                case "object":
                    if (Array.isArray(_input)) {
                        const results = await Promise.all(_input.map(async (e) => {
                            return await DAO(e, _info);
                        }));
                        resolve(results);
                    }
                    else {
                        const results = await Promise.all(Object.keys(_input).map(async (e) => {
                            return await {[e]: await DAO(_input[e], _info)};
                        }));
                        resolve(results.reduce((acc, obj) => {
                            Object.keys(obj).forEach(key => {
                                acc[key] = obj[key];
                            });
                            return acc;
                        }, {}));
                    }
                    break;

                default:
                    resolve(_input)
                    break;
            }
        }
        else {
            resolve(_input)
        }
    })
}

export async function getInfo(_url = null) {
    const addons = await (await getJSON(chrome.runtime.getURL("../../addon/addon.json")))
    let rem = []
    addons.forEach(async (e) => {
        const rem_a = await getJSON(chrome.runtime.getURL(`../../addon/${e}/info.json`))
        rem_a.id = e
        rem.push(rem_a)
    })
    await new Promise(async (resolve, reject) => {
        const update = () => {
            if (rem.length == addons.length) {
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

export async function infoListenerGetter(_addonsEnabled, _func) {
    Object.keys(_addonsEnabled).forEach(async (e) => {
        if (!_addonsEnabled[e]) return
        try {
            const rem_a = await getJSON(chrome.runtime.getURL(`../../addon/${e}/info.json`))
            rem_a.id = e
            _func(rem_a)
        }
        catch (error) {
            localConsole.error(chrome.runtime.getURL(`../../addon/${e}/info.json`), "could not be loaded\nReason:", error)
        }
    })
}

// Old
export async function infoCodeRunner(_info, _type, _input, _path, output = { self: true, console: true }) {
    if (_input == undefined) return
    // console.log(_info, _type, _input, _info.code["IF_"+_type])

    const rem = Array.isArray(_input) ? _input : [_input]
    const rem_a = {}
    rem.forEach(async (b) => {
        let _output = output
        let IF_;
        let run = true
        if (_info.code["IF_" + _type] != undefined) {
            IF_ = await getScript(chrome.runtime.getURL(`../../addon/${_path}/${_info.code["IF_" + _type]}`))
            try {
                run = await IF_["IF_" + _type]({ output: _output, console, call: { path: b } })
            }
            catch (error) {
                localConsole.error(`Function ${"IF_" + _type} is not defined\nFile: ${chrome.runtime.getURL(`../../addon/${_path}/${_info.code["IF_" + _type]}`)}`)
            }
        }
        // console.log(run)

        if (run) {
            const rem_b = await getScript(chrome.runtime.getURL(`../../addon/${_path}/${b}`))
            rem_a[b] = rem_b
            _output.self === true ? delete _output.self : _output.self = rem_b
            _output.console == true ? delete _output.console : _output.console = { ..._realConsole, ...easyCreateConsole(_path, b) }
            // console.log(output)

            try {
                rem_b[_type](_output)
            }
            catch (error) {
                localConsole.error(`Function ${_type} is not defined\nFile: ${chrome.runtime.getURL(`../../addon/${_path}/${b}`)}`)
            }
        }
        else {
            rem_a[b] = undefined
        }
    })
    await new Promise((resolve, reject) => {
        const update = () => {
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
    const rem = _url.split(".")
    try {
        switch (rem[rem.length - 1]) {
            case "js":
                return (await Promise.all([
                    import(_url)
                ]))[0];
                break;
            case "css":
                const element = document.createElement("link")
                element.rel = "stylesheet"
                element.href = _url
                return element
                break;

            default:
                localConsole.error(`${_url} is not a valid file`)
                break;
        }
    }
    catch (error) {
        localConsole.error(`Failed to get ${_url}\nReason: ${error}`)
    }
}
export async function scriptListenerGetter(_info, _root, _urls, _func) {
    _urls.forEach(async e => {
        const rem = await DAO(e, _info)
        if (rem != undefined) e = rem
        getScript(`${_root}/${e}`).then((c) => {
            _func(c, e)
        })
    });
}
export async function IF_scriptListenerGetter(_info, _root, _url, _func) {
    const rem = await DAO(_info.code["IF_" + _url], _info)
    if (rem != undefined) _info.code["IF_" + _url] = rem

    if (_info.code["IF_" + _url] != undefined) {
        if (!Array.isArray(_info.code["IF_" + _url])) _info.code["IF_" + _url] = [_info.code["IF_" + _url]]
        scriptListenerGetter(_info, addonRootUrl + _info.id, _info.code["IF_" + _url], (b) => {
            _info.code[_url].forEach(async (e) => {
                const rem = await DAO(e, _info)
                if (rem != undefined) e = rem
                b["IF_" + _url]({ call: e }).then((a) => {
                    if (a) {
                        getScript(`${_root}/${e}`).then(
                            (c) => {
                                _func(c, e)
                            }
                        )
                    }
                })
            })
        })
    }
    else {
        scriptListenerGetter(_info, _root, _info.code[_url], _func)
    }
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
    _name.forEach((e) => {
        rem += ` : ${e}`
    })
    return {
        log: createConsole.log(rem),
        error: createConsole.error(rem),
        _realConsole,
    }
}
const localConsole = {
    log: createConsole.log(`api : module.js`),
    error: createConsole.error(`api : module.js`),
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
        chrome.storage.sync.set({ addonsEnabled: set })
    },


    async getAddonsSettings(_get = null) {
        if (_get == null) {
            return (await chrome.storage.sync.get("addonSettings")).addonSettings
        }
        else {
            return (await chrome.storage.sync.get("addonSettings")).addonSettings?.[_get]
        }
    },
    setAddonsSettings(set) {
        chrome.storage.sync.set({ addonSettings: set })
    },
    async changeOrAddSetting(insideOf, setting, value) {
        const rem = await storage.getAddonsSettings() || {}
        if (rem?.[insideOf] == undefined) {
            rem[insideOf] = {}
        }
        rem[insideOf][setting] = value
        rem._addonChanged = {
            type: "addonsSettings",
            change: {
                name: [insideOf],
                value: [setting, value]
            }
        }
        storage.setAddonsSettings(rem)
    }

}

export const settingElements = {}

export function fullParserCreator(input, _storage, _id) {
    let _elements = document.createElement("span");
    _elements.style.display = "contents";

    // console.log(_elements)
    if (!Array.isArray(input)) {
        const element = document.createElement("span");
        element.innerText = input;
        _elements.append(element);
    } else {
        input.forEach((array) => {
            const rem_a = parserCreator(array, _storage, _id)
            _elements.append(rem_a.element)
            if (rem_a.data != undefined) {
                settingElements[rem_a.data] = rem_a.element
            }
        });
    }
    return _elements
}

export function parserCreator(part, _storage, _id) {
    let data = part[1];
    let element;
    const output = (() => {
        switch (part[0]) {
            case "text":
                element = document.createElement("span");
                element.innerText = data;
                return ({
                    element,
                });
                break;
            case "link":
                element = document.createElement("a");
                element.innerText = data.text;
                element.href = data.url;
                element.target = "_blank"
                return ({
                    element,
                });
                break;
            case "number":
                element = document.createElement("input");
                element.type = "number";
                element.id = data;
                element.addEventListener("input", async (e) => {
                    await storage.changeOrAddSetting(_id, data, element.value)
                })
                if (_storage?.[data] != undefined) {
                    element.value = _storage[data]
                }
                return ({
                    element,
                    data
                });
                break;

            case "field":
                element = document.createElement("input");
                element.type = "text";
                element.id = data;
                element.addEventListener("input", async (e) => {
                    await storage.changeOrAddSetting(_id, data, element.value)
                })
                if (_storage?.[data] != undefined) {
                    element.value = _storage[data]
                }
                return ({
                    element,
                    data
                });
                break;

            case "br":
                return ({
                    element: document.createElement("br"),
                });
                break;

            case "dropdown":
                element = document.createElement("select");
                element.id = data.name;
                element.addEventListener("input", async (e) => {
                    await storage.changeOrAddSetting(_id, data.name, element.value)
                })
                data.options.forEach((option) => {
                    let temp = document.createElement("option");
                    temp.value = option;
                    temp.text = option;
                    element.append(temp);
                });
                if (_storage?.[data.name] != undefined) {
                    element.value = _storage[data.name]
                }
                return ({
                    element,
                    data: data.name
                });
            case "img":
                element = document.createElement("img");
                element.src = data.src
                // console.log(data.height)
                if (data.height != undefined) element.style.height = typeof data.height === "number" ? data.height + "px" : data.height
                if (data.width != undefined) element.style.width = typeof data.width === "number" ? data.width + "px" : data.width
                if (data.ratio != undefined) element.style.aspectRatio = data.ratio
                return ({
                    element,
                });
                break;
            case "span":
                return ({
                    element: document.createElement("span"),
                });
                break;


            default:
                element = document.createElement("span");
                element.innerText = " ERROR ";
                return ({
                    element,
                });
                break;
        }
    })()
    if (data?.id != undefined) {
        output.element.id = data.id;
    }
    if (data?.class != undefined) {
        output.element.className = data.class;
    }
    if (data?.default != undefined) {
        output.element = data.default;
    }
    if (part[2] != undefined) {
        output.element.append(fullParserCreator(part[2]))
    }
    return output
}

// storage.raw.hello = "aosfjoaihh"
// console.log(await storage.raw.hello)
// console.log(await storage.raw)
// storage.set({"hello": "wow", "asjofh": "ajjf", "1208": "oisaf"})
// console.log(await settings.get("hello"))
// console.log(await chrome.storage.sync.get(null))
