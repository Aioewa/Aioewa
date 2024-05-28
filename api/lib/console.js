const _realConsole = console

const rem = {
    _realConsole,
    output(logAuthor = "[page]") {
        const style = {
            // Remember to change these as well on cs.js
            leftPrefix: "background:  #055b50; color: white; border-radius: 0.5rem 0 0 0.5rem; padding: 0 0.5rem",
            rightPrefix:
                "background: #222; color: white; border-radius: 0 0.5rem 0.5rem 0; padding: 0 0.5rem; font-weight: bold",
            text: "",
        };
        return [`%cAioewa%c${logAuthor}%c`, style.leftPrefix, style.rightPrefix, style.text];
    },
    create: {
        log: (e) => _realConsole.log.bind(_realConsole, ...rem.output(e)),
        error: (e) => _realConsole.error.bind(_realConsole, ...rem.output(e)),
        warn: (e) => _realConsole.warn.bind(_realConsole, ...rem.output(e)),
        _realConsole: console,
    },
    /**
     * Create a new console with the given names.
     *
     * @param {...string} _name - the names to be included in the object
     * @return {Console} an object with log, error, and _realConsole properties
     */
    easyCreate(..._name) {
        let rem = `${_name[0]}`;
        _name.shift()
        _name.forEach((e) => {
            rem += ` : ${e}`
        })
        return {
            log: this.create.log(rem),
            error: this.create.error(rem),
            warn: this.create.warn(rem),
            _realConsole,
        }
    }
}

const _console = {...rem, ...rem.easyCreate("api")}
export {_console as console}