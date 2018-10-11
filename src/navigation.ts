import * as values from "./values.js";
export class Navigation {
  currentLocation: Location;

  updateLocation(tabLink: string) {
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

    if (
      tabLink.includes(values.LINK_MAIN_PLEMIONA) ||
      tabLink.includes(values.LINK_PART_SESSION_EXPIRED)
    ) {
      this.currentLocation = Location.LOG_OUT_PAGE;
    }
  }

  navigateTo(currentTabId: number, destination: Location) {
    let navigateUrl: string;

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

export enum Location {
  MAIN,
  PLACE,
  MAP,
  VILLAGE,
  LOG_OUT_PAGE
}
