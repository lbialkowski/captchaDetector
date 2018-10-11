chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.msg == "CHECK_CAPTCHA") {
    let isCaptcha: boolean = document.querySelector(".g-recaptcha") !== null;

    sendResponse({ isCaptcha: isCaptcha });
  }
});