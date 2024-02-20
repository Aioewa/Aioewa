```json
"code": {
    "css": "__DAO_css__",
    "IF_css": "__DAO_css__",
    "CACHE_css": true,

    "DAO": "DAO.js"
}
```    
When background starts on install. It caches all of the css that has `"CACHE_onTab": true"`. If it is false, it ignores it. Recommend to have it `true` for speed. It will get updated after some seconds anyways.

When on tab the cache gets inject (gets stored in storage.sync). But the link element gets inject too. When the link element is done loading the cache gets deleted. 

`On install` > `goes thru all of the info.json files that is enabled` > `stores the css files in storage.sync`

`Addon gets disabled` > `delete the cache for that addon (for not taking to much storage)`

`Addon gets enabled` > `gets all the css and adds it to the cache`

`css (on tab)` > `inject the css cache files` > `injects the link css element` > `when link element is done loading` > `delete the cache style element` > `check if the link element text is different from the cache` > `if so change the cache to the new css`