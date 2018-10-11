"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const values_js_1 = require("./values.js");
var startedScript = false;
var checkVillagesModuleEnabled = false;
var isVillageView = false;
var isLogged = false;
var isMainView = false;
var isPlaceView = false;
var isMapView = false;
var currTabId;
chrome.runtime.onConnect.addListener(function (port) {
    if (startedScript)
        port.postMessage("ScriptEnabled");
    else
        port.postMessage("ScriptDisabled");
    port.onMessage.addListener(function (msg) {
        if (msg == "EnableScript") {
            chrome.tabs.getSelected(null, function (tab) {
                currTabId = tab.id;
                startedScript = true;
                console.log("Script started...");
                checkStatus();
            });
        }
        if (msg == "DisableScript") {
            startedScript = false;
        }
    });
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (currTabId == null)
        currTabId = tabId;
    if (startedScript && changeInfo.status == "complete") {
        checkStatus();
    }
});
function checkStatus() {
    chrome.tabs.get(currTabId, function (tab) {
        let tablink = tab.url;
        isLogged =
            tablink.includes("https://www.plemiona.pl/") ||
                tablink.includes("session_expired=1");
        isMainView = tablink.includes(values_js_1.LINK_PART_MAIN);
        isPlaceView = tablink.includes(values_js_1.LINK_PART_PLACE);
        isVillageView = tablink.includes(values_js_1.LINK_PART_VILLAGE);
        isMapView = tablink.includes(values_js_1.LINK_PART_MAP);
        isCaptchaDisplayedOnScreen().then(function (isCaptcha) {
            if (isCaptcha) {
                console.log("CAPTCHA DETECTED!!");
            }
            else {
                scriptStep();
            }
        });
    });
}
function isCaptchaDisplayedOnScreen() {
    return new Promise(function (resolve, reject) {
        chrome.tabs.sendMessage(currTabId, { msg: "CHECK_CAPTCHA" }, function (response) {
            resolve(response.isCaptcha);
        });
    });
}
function scriptStep() {
    if (isMainView) {
        navigateToPlace();
    }
    if (isPlaceView) {
        navigateToMap();
    }
    if (isMapView) {
        navigateToMain();
    }
}
function navigateToPlace() {
    chrome.tabs.update(currTabId, {
        url: values_js_1.LINK_PLACE
    });
}
function navigateToMain() {
    chrome.tabs.update(currTabId, {
        url: values_js_1.LINK_MAIN
    });
}
function navigateToMap() {
    chrome.tabs.update(currTabId, {
        url: values_js_1.LINK_MAP
    });
}
//# sourceMappingURL=background.js.map