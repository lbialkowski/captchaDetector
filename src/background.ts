import * as values from "./values.js";
import { Navigation } from "./navigation.js";
import { Location } from "./navigation.js";
import { isCaptchaDisplayedOnScreen } from "./captchaSolver.js";

let startedScript: boolean = false;
let currTabId: number;
let navigation: Navigation = new Navigation();

chrome.runtime.onConnect.addListener(function(port) {
  if (startedScript) {
    port.postMessage(values.MSG_SCRIPT_ENABLED);
  } else {
    port.postMessage(values.MSG_SCRIPT_DISABLED);
  }
  setupPortListener(port);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (currTabId == null) currTabId = tabId;
  if (changeInfo.status === "complete") {
    navigation.updateLocation(tab.url);
    if (startedScript) {
      checkStatus();
    }
  }
});

function setupPortListener(port: chrome.runtime.Port) {
  port.onMessage.addListener(function(msg) {
    if (msg == values.MSG_SCRIPT_ENABLED) {
      enableScript();
    }
    if (msg == values.MSG_SCRIPT_DISABLED) {
     disableScript()
    }
  });
}

function enableScript() {
  getSelectedTabId().then(tabId => {
    currTabId = tabId;
    startedScript = true;
    console.log("Script started...");
    checkStatus();
  });
}

function disableScript() {
  getSelectedTabId().then(tabId => {
    startedScript = false;
  });
}

function getSelectedTabId(): Promise<number> {
  return new Promise(function(resolve, reject) {
    chrome.tabs.getSelected(null, function(tab) {
      resolve(tab.id);
    });
  });
}

function checkStatus() {
  isCaptchaDisplayedOnScreen(currTabId).then(function(isCaptcha: boolean) {
    if (isCaptcha) {
      console.log("CAPTCHA DETECTED!!");
    } else {
      scriptStep();
    }
  });
}

function scriptStep() {
  if (navigation.currentLocation === Location.MAIN)
    navigation.navigateTo(currTabId, Location.PLACE);

  if (navigation.currentLocation === Location.PLACE)
    navigation.navigateTo(currTabId, Location.MAP);

  if (navigation.currentLocation === Location.MAP)
    navigation.navigateTo(currTabId, Location.MAIN);
}
