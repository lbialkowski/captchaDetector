import * as values from "./values.js";
export class Navigation {
    updateLocation(tabLink) {
        if (tabLink.includes(values.LINK_PART_MAIN)) {
            this.currentLocation = Location.MAIN;
        }
        if (tabLink.includes(values.LINK_PART_PLACE)) {
            this.currentLocation = Location.PLACE;
        }
        if (tabLink.includes(values.LINK_PART_VILLAGE)) {
            this.currentLocation = Location.VILLAGE;
        }
        if (tabLink.includes(values.LINK_PART_MAP)) {
            this.currentLocation = Location.MAP;
        }
        if (tabLink.includes(values.LINK_MAIN_PLEMIONA) ||
            tabLink.includes(values.LINK_PART_SESSION_EXPIRED)) {
            this.currentLocation = Location.LOG_OUT_PAGE;
        }
    }
    navigateTo(currentTabId, destination) {
        let navigateUrl;
        switch (destination) {
            case Location.MAIN:
                navigateUrl = values.LINK_MAIN;
                break;
            case Location.PLACE:
                navigateUrl = values.LINK_PLACE;
                break;
            case Location.MAP:
                navigateUrl = values.LINK_MAP;
                break;
            default:
                navigateUrl = values.LINK_MAIN;
        }
        chrome.tabs.update(currentTabId, {
            url: navigateUrl
        });
    }
}
export var Location;
(function (Location) {
    Location[Location["MAIN"] = 0] = "MAIN";
    Location[Location["PLACE"] = 1] = "PLACE";
    Location[Location["MAP"] = 2] = "MAP";
    Location[Location["VILLAGE"] = 3] = "VILLAGE";
    Location[Location["LOG_OUT_PAGE"] = 4] = "LOG_OUT_PAGE";
})(Location || (Location = {}));
