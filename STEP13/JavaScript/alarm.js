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
class Viewer {
  constructor(Data) {
    this.Data = Data;
  }
  getClock() {
    const date = new Date();
    const clock = document.querySelector(".clock");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
  }
  getTimeType(event) {
    const inputValue = event.target.value;
    const fixValue = function (str) {
      str = str.replace(/[^0-9]/g, "");
      let val = "";
      if (str.length < 3) {
        return str;
      } else if (str.length < 5) {
        val += str.substr(0, 2);
        val += ":";
        val += str.substr(2);
        return val;
      } else {
        val += str.substr(0, 2);
        val += ":";
        val += str.substr(2, 2);
        val += ":";
        val += str.substr(4);
        return val;
      }
    };
    event.target.value = fixValue(inputValue);
  }
  getTimeForm() {
    const timeForm = document.createElement("form");
    timeForm.innerHTML = `
        <input type="text" placeholder="00:00:00" maxlength=8>
        <input type="submit" value="+">
      `;
    return timeForm;
  }
  warningMention(mention) {
    const warning = document.querySelector(".warning");
    warning.classList.remove("hidden");
    warning.innerText = mention;
  }
}
class AlarmController {
  constructor(AlarmData, Viewer, NavigatorViewer) {
    this.AlarmData = AlarmData;
    this.Viewer = Viewer;
    this.NavigatorViewer = NavigatorViewer;
  }
  submitContentEvent(event) {
    // event.target은 module_form
    event.preventDefault();
    const targetForm = event.target;
    const LIMITEDINPUT = 4;
    const formInputLength = targetForm.querySelectorAll("input").length;
    if (formInputLength >= LIMITEDINPUT) {
      this.Viewer.warningMention("ALREADY SUBMITTED");
      return;
    }
    const targetValue = targetForm.querySelector("input").value;
    const timeForm = this.Viewer.getTimeForm();
    targetForm.appendChild(timeForm);
    const timeInput = timeForm.querySelector("input");
    timeInput.addEventListener("keyup", this.Viewer.getTimeType);
    timeForm.addEventListener("submit", this.submitTimeEvent.bind(this));
  }
  submitTimeEvent(event) {
    event.preventDefault();
    const time = event.target.querySelector("input").value;
    const hours = time.substr(0, 2);
    const minutes = time.substr(3, 2);
    const seconds = time.substr(6, 2);
    if (hours > 24 || minutes > 59 || seconds > 59) {
      this.Viewer.warningMention("WRONG TIME SETTING");
      return;
    }
  }
  getSubmitContentEvent() {
    const targetForm = document.querySelector(".remain_form");
    targetForm.addEventListener("submit", this.submitContentEvent.bind(this));
  }
  operateNavi() {
    this.NavigatorViewer.getNavigation();
  }
  operateTime() {
    this.Viewer.getClock();
    setInterval(this.Viewer.getClock, 1000);
  }
}
const navigatorViewer = new NavigatorViewer([
  { "list-alt": "ToDo" },
  { "calendar-alt": "calendar" },
  { clock: "alarm" },
]);
const timeViewer = new Viewer(1);
const alarmStart = new AlarmController(1, timeViewer, navigatorViewer);
// 추후 1 수정 필요
// 나중에 operateNavi 파일을 따로 생성
const init = () => {
  alarmStart.operateNavi();
  alarmStart.operateTime();
  alarmStart.getSubmitContentEvent();
};
init();
