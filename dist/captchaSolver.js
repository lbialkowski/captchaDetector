export function isCaptchaDisplayedOnScreen(currTabId) {
    return new Promise(function (resolve, reject) {
        chrome.tabs.sendMessage(currTabId, { msg: "CHECK_CAPTCHA" }, function (response) {
            resolve(response.isCaptcha);
        });
    });
}
