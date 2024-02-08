# Constant:
```json
{
    "AV": "1",
    "id": "a",
    "name": "Hello there 😺",
    "description": "Log a 'Hello there 😺' in the console!",
    "credits": [
        {
            "userID": 1,
            "contributed": {
                "code": 20
            }
        }
    ],
    "tags": ["community"],
    "versionAdded": "1.0.0",
    "code": {
        "onTab": "addon.js",
        "background": "background.js"
    }
}
```
# Dynamic:
`DAO` = dynamic addon output.

`DAOE` = dynamic addon output event.

Things that does not contain `DAO` or `DAOE` here should always be constant.

Things that are `DAOE` and not `DAO` can be both, but things that is `DAO` and not `DAOE` can not be `DAOE`. (You will not get an ERROR but the event will not be listen to.)
```json
{
    "AV": "1",
    "id": "a",
    "name": "__DAOE_name__",
    "description": "__DAOE_description__",
    "credits": "__DAOE_credits-list__",
    "tags": "__DAOE_tags-list__",
    "versionAdded": "1.0.0",
    "versionLastUpdated": "__DAOE_version-last-updated",
    "code": {
        "DAO": "DAO.js",
        "DAOE": "DAO.js",
        "onTab": "__DAO_onTab__",
        "background": "__DAO_background__"
    }
}
```