import { tab } from "./lib/tab.js"
import { get } from "./lib/get.js"
import { storage } from "./lib/storage.js"
import { console } from "./lib/console.js"

export { tab, get, storage, console }

// class scripts {
//     #scripts
//     scripts = new Proxy(this.#scripts, {
//         get: (target, string, receiver)=>{
//             console.log(target, string, receiver)
//             return true
//         }
//     })
// } 

/**
 * DAO - dynamic addon output
 * 
 * @param {string} _input - The input to be processed by the DAO function. Can be of type "string", "object", or "any other".
 * @param {JSON} _info - The information about the addon. It is the info.json of the addon.
 * 
 * @returns {Promise} - A promise that resolves to the output of the DAO function. The output can be of any type.
 * 
 * @description
 * DAO can take in `__DAO_someInput__` and calls the addon's DAO function which gives the output. It can also take in `__MSG_someInput__` and gets the message from _locales.
 */
export async function DAO(_input, _info) {
    return new Promise(async (resolve, reject) => {
        if (_info?.code?.DAO != undefined) {
            const addon = {
                info: _info
            }
            const localConsole = { ...aw.console._realConsole, ...aw.console.easyCreate(_info.id, "DAO") }
            switch (typeof _input) {
                case "string":

                    if (_input.slice(0, 6) == "__DAO_" && _input.slice(_input.length - 2, _input.length) == "__") {
                        const rem = await get.script(chrome.runtime.getURL(`/addon/${_info.id}/${_info.code.DAO}`))
                        addon.self = rem
                        addon.settings = await storage.getAddonsSettings(_info.id)
                        resolve(await DAO(await rem.DAO({ input: _input.slice(6, _input.length - 2), addon, console: localConsole }), _info))
                    }
                    if (_input.slice(0, 6) == "__MSG_" && _input.slice(_input.length - 2, _input.length) == "__") {
                        resolve(await DAO(chrome.i18n.getMessage(_input.slice(6, _input.length - 2)), _info))
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
                            return await { [e]: await DAO(_input[e], _info) };
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

/**
 * Asynchronously gets information for enabled addons and calls a function with the addon information.
 *
 * @param {object} _addonsEnabled - Object representing the enabled addons
 * @param {function} _func - Callback function to be called with addon information
 * @return {void}
 */
export async function infoListenerGetter(_addonsEnabled, _func) {
    Object.keys(_addonsEnabled).forEach(async (e) => {
        if (!_addonsEnabled[e]) return
        try {
            const rem_a = await get.JSON(chrome.runtime.getURL(`../../addon/${e}/info.json`))
            rem_a.id = e
            _func(rem_a)
        }
        catch (error) {
            console.error(chrome.runtime.getURL(`../../addon/${e}/info.json`), "could not be loaded\nReason:", error)
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
            IF_ = await get.script(chrome.runtime.getURL(`../../addon/${_path}/${_info.code["IF_" + _type]}`))
            try {
                run = await IF_["IF_" + _type]({ output: _output, console: console, call: { path: b } })
            }
            catch (error) {
                console.error(`Function ${"IF_" + _type} is not defined\nFile: ${chrome.runtime.getURL(`../../addon/${_path}/${_info.code["IF_" + _type]}`)}`)
            }
        }
        // console.log(run)

        if (run) {
            const rem_b = await get.script(chrome.runtime.getURL(`../../addon/${_path}/${b}`))
            rem_a[b] = rem_b
            _output.self === true ? delete _output.self : _output.self = rem_b
            _output.console == true ? delete _output.console : _output.console = { ..._realConsole, ...easyCreateConsole(_path, b) }
            // console.log(output)

            try {
                rem_b[_type](_output)
            }
            catch (error) {
                console.error(`Function ${_type} is not defined\nFile: ${chrome.runtime.getURL(`../../addon/${_path}/${b}`)}`)
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
/**
 * Retrieves scripts from specified URLs and executes a provided function on each script.
 *
 * @param {JSON} _info - Information object
 * @param {string} _root - Root path
 * @param {Array<string>} _urls - Array of URLs
 * @param {Function} _func - Function to be executed on each script
 * @return {Promise<void>} 
 */
export async function scriptListenerGetter(_info, _root, _urls, _func) {
    _urls.forEach(async e => {
        const rem = await DAO(e, _info)
        if (rem != undefined) e = rem
        // console.log(e)
        get.script(`${_root}/${e}`).then((c) => {
            _func(c, e)
        })
    });
}
/**
 * Asynchronous function to get script listener.
 *
 * @param {object} _info - information object
 * @param {string} _root - root string
 * @param {string} _url - URL string
 * @param {function} _func - callback function
 * @return {void} a Promise
 */
export async function IF_scriptListenerGetter(_info, _root, _url, _func) {
    const rem = await DAO(_info.code["IF_" + _url], _info)
    if (rem != undefined) _info.code["IF_" + _url] = rem
    
    const localConsole = console.easyCreate("IF_" + _url) //MW

    if (_info.code["IF_" + _url] != undefined) {
        if (!Array.isArray(_info.code["IF_" + _url])) _info.code["IF_" + _url] = [_info.code["IF_" + _url]]
        scriptListenerGetter(_info, addonRootUrl + _info.id, _info.code["IF_" + _url], (b) => {
            _info.code[_url].forEach(async (e) => {
                const rem = await DAO(e, _info)
                if (rem != undefined) e = rem
                b["IF_" + _url]({ call: e, console: localConsole }).then((a) => {
                    if (a) {
                        get.script(`${_root}/${e}`).then(
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


// if(await(await chrome.storage.sync.get(null)).settings == undefined) {
//     chrome.storage.sync.set({settings: {}})
// }


export const settingElements = {}

/**
 * Creates a full parser for the input, optionally using the given storage and id.
 *
 * @param {any} input - the input to be parsed
 * @param {any} _storage - the storage to be used
 * @param {any} _id - the id to be used
 * @return {HTMLElement} the parsed elements
 */
export function fullParserCreator(input, _storage, _id) {
    let _elements = document.createElement("span");
    _elements.style.display = "contents";

    // console.log(input)
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

/**
 * Creates a parser based on the given part, storage, and id.
 *
 * @param {any} part - the part to create the parser from
 * @param {any} _storage - the storage data
 * @param {any} _id - the id of the addon
 * @return {Element} the created element and optional data
 */
export function parserCreator(part, _storage, _id) {
    let data = part[1];
    let element;
    const output = (() => {
        switch (part[0]) {
            case "text":
                element = document.createElement("span");
                if (typeof data == "string") {
                    element.innerText = data;
                }
                else {
                    element.innerText = data.text;
                }
                return ({
                    element,
                });
                break;
            case "link":
                element = document.createElement("a");
                if (data.text != undefined) {
                    element.innerText = data.text;
                }
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
                element.id = data.id;
                element.addEventListener("input", async (e) => {
                    await storage.changeOrAddSetting(_id, data.id, element.value)
                })
                if (_storage?.[data.id] != undefined) {
                    element.value = _storage[data.id]
                }
                return ({
                    element,
                    data: data.id
                });
                break;

            case "textarea":
                element = document.createElement("textarea");
                element.style.resize = "none"
                element.id = data.id;
                element.addEventListener("input", async (e) => {
                    await storage.changeOrAddSetting(_id, data.id, element.value)
                })
                if (_storage?.[data.id] != undefined) {
                    element.value = _storage[data.id]
                }
                if (data.height != undefined) element.style.height = typeof data.height === "number" ? data.height + "px" : data.height
                if (data.width != undefined) { element.style.width = typeof data.width === "number" ? data.width + "px" : data.width }
                else { element.style.width = "-webkit-fill-available" }

                return ({
                    element,
                    data: data.id
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
