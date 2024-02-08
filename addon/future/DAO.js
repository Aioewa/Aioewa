export function DAO({dao}) {
    // if "__DAO_onTab__" is used, then dao = "onTab"
    // DAO should return the output.
    const rem = {
        "onTab": "addon.js",
        "background": "background.js",
    }
    return rem[dao]
}

export function DAOE({dao, event}) {
    // if "__DAOE_onTab__" is used, then dao = "onTab"
    // event is an function that you can give the output
    // DAOE should return the output and have the event.
    const rem = {
        "name": "Future addon methods",
        "description": "The new feature that is shown on the future addon is: DAO and DAOE",
        "credits-list": [
            {
                "userID": 1,
                "contributed": {
                    "code": 20
                }
            }
        ],
        "tags-list": ["community"],
        "version-last-updated": "1.0.0",
    }

}