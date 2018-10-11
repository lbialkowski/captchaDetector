export function isCaptchaDisplayedOnScreen(currTabId: number): Promise<boolean> {
    return new Promise(function(resolve, reject) {
      chrome.tabs.sendMessage(currTabId, { msg: "CHECK_CAPTCHA" }, function(
        response
      ) {
        resolve(response.isCaptcha);
      });
    });
  }