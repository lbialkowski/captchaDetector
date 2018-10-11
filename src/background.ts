import { WORLD_NUMBER, LINK_PART_MAIN, LINK_PART_MAP, LINK_PART_PLACE, LINK_PART_VILLAGE, LINK_MAIN, LINK_MAP, LINK_PLACE  } from './values.js';

//logic
var startedScript = false;
var checkVillagesModuleEnabled = false;
var isVillageView = false;
var isLogged = false;
var isMainView = false;
var isPlaceView = false;
var isMapView = false;

//others
var currTabId: number;

chrome.runtime.onConnect.addListener(function(port) {
  if (startedScript) port.postMessage("ScriptEnabled");
  else port.postMessage("ScriptDisabled");

  port.onMessage.addListener(function(msg) {
    if (msg == "EnableScript") {
      chrome.tabs.getSelected(null, function(tab) {
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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (currTabId == null) currTabId = tabId;
  if (startedScript && changeInfo.status == "complete") {
    checkStatus();
  }
});

function checkStatus() {
  chrome.tabs.get(currTabId, function(tab) {
    let tablink: String = tab.url;

    isLogged =
      tablink.includes("https://www.plemiona.pl/") ||
      tablink.includes("session_expired=1");

    isMainView = tablink.includes(LINK_PART_MAIN);

    isPlaceView = tablink.includes(LINK_PART_PLACE);

    isVillageView = tablink.includes(LINK_PART_VILLAGE);

    isMapView = tablink.includes(LINK_PART_MAP);

    isCaptchaDisplayedOnScreen().then(function(isCaptcha: boolean) {
      if (isCaptcha) {
        console.log("CAPTCHA DETECTED!!");
      } else {
        scriptStep();
      }
    });
  });
}

function isCaptchaDisplayedOnScreen(): Promise<boolean> {
  return new Promise(function(resolve, reject) {
    chrome.tabs.sendMessage(currTabId, { msg: "CHECK_CAPTCHA" }, function(
      response
    ) {
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
    url: LINK_PLACE
  });
}

function navigateToMain() {
  chrome.tabs.update(currTabId, {
    url: LINK_MAIN
  });
}

function navigateToMap() {
  chrome.tabs.update(currTabId, {
    url: LINK_MAP
  });
}