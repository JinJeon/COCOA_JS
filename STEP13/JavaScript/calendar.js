// Data, Viewer class 생성 필요

class NavigatorViewer {
  constructor(array) {
    this.navItemArr = array;
    this.nav = document.querySelector("nav").querySelector("ul");
  }
  whatPageIs() {
    const link = document.URL;
    const extensionLength = link.substr(-1) === "l" ? 5 : 6;
    const linkName = link.substring(
      link.lastIndexOf("/") + 1,
      link.length - extensionLength
    );
    this.navItemArr.forEach((el, index) => {
      if (linkName === Object.values(el)[0]) {
        this.nav
          .querySelectorAll("a")
          [index].querySelector("li")
          .classList.add("currentIcon");
      }
    });
  }
  getNavigation() {
    this.navItemArr.forEach((el) => {
      this.nav.appendChild(
        this.makeIcon(
          `fas fa-${Object.keys(el)[0]}`,
          "li",
          `${Object.values(el)[0]}`
        )
      );
    });
    this.whatPageIs();
  }
  makeIcon(figure, element, link = null) {
    const appendedItem = document.createElement(`${element}`);
    const icon = document.createElement("i");
    icon.setAttribute("class", `${figure}`);
    appendedItem.appendChild(icon);
    if (link) {
      const anker = document.createElement("a");
      anker.setAttribute("href", `./${link}.html`);
      anker.appendChild(appendedItem);
      return anker;
    }
    return appendedItem;
  }
}

class AlarmController {
  constructor(AlarmData, Viewer, NavigatorViewer) {
    this.AlarmData = AlarmData;
    this.Viewer = Viewer;
    this.NavigatorViewer = NavigatorViewer;
  }
  operateNavi() {
    this.NavigatorViewer.getNavigation();
  }
}
const navigatorViewer = new NavigatorViewer([
  { "list-alt": "ToDo" },
  { "calendar-alt": "calendar" },
  { clock: "alarm" },
]);
const alarmStart = new AlarmController(1, 1, navigatorViewer);
// 추후 1,1 수정 필요
alarmStart.operateNavi();
// 나중에 operateNavi 파일을 따로 생성
