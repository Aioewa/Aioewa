# Developing features for Aioewa

## `info.json` syntax

| Name          | Description                                                                                                   | Code                                                          | Required                                                        | Property type            |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------ |
| `AV`          | Aioewa version your feature uses                                                                              | `"AV": "1"`                                                   | ✅                                                              | `string`                 |
| `name`        | Name of your feature, will be used in the features list.                                                      | `"name": "Test Feature"`                                      | ❌, but strongly recommended                                    | `string`                 |
| `description` | Shows the description of the addon, more on [Description and addon settings](#description-and-addon-settings) | `"description": "This is my test feature" `                   | ❌, but strongly recommended                                    | `string`                 |
| `credits`     | Shows the names of the contributors to the addon                                                              | `"credits": [{ "userID": 0, "contributed": { "code": 20 } }]` | ❌, but strongly recommended                                    | An `Array` of `Object`'s |
| `tags`        | The tags of addon, they can be used to filter that addon from others                                          | `"tags": ["community"]`                                       | ❌, but recommended if you want your extension to be filterable | An `Array` of `String`'s |

## Description and addon settings

In Aioewa, description is based of an array with either strings to create text, or an array with a string specifying a type and an object's with other settings. There are types like numbers, dropdown menus, links and etc.

The addon settings are decided if you use specific type of element in the description.

| Element type    | Type name  | Description                                                                                              | Other Options in it             | Used for addon settings |
| --------------- | ---------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------------------- |
| Text            | `text`     | Just adds text                                                                                           | The text itself, after the type | No |
| Number          | `number`   | Creates an input box for only numbers                                                                    | After the type provide `id` inside an object, it will be used as variable name inside the addon's code | Yes | 
| Text field      | `field`    | Creates an input box for technically anything, basically text/string                                     | After the type provide `id` inside an object, it will be used as variable name inside the addon's code | Yes |
| Dropdown/Select | `dropdown` | Creates an select box where you can add options in info.json so the user can choose only specific values | After the type provide `id` inside an object, it will be used as variable name inside the addon's code. Provide also `options` array in the object, which will be used to show those options for the select element | Yes |
| Link            | `link`     | Creates an select box where you can add options in info.json so the user can choose only specific values | After the type provide `text` which will be used as the text for the link and provide `url` for the link itself. | No |
