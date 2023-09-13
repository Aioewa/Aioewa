import {api} from "./api.js";

chrome.runtime.onInstalled.addListener((details) => {
    console.log(api.getMSG("HelloThere"))
    console.log("chrome-extension://" + chrome.runtime.id + "/index.html")
    console.log(chrome)
});
