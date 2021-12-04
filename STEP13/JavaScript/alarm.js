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
  makePadStart(number) {
    return String(number).padStart(2, "0");
  }
  getClock() {
    const date = new Date();
    const clock = document.querySelector(".clock");
    const years = String(date.getFullYear());
    const months = String(date.getMonth());
    const days = String(date.getDay());
    const hours = this.makePadStart(date.getHours());
    const minutes = this.makePadStart(date.getMinutes());
    const seconds = this.makePadStart(date.getSeconds());
    clock.innerText = `${hours}:${minutes}:${seconds}`;
    return [years, months, days, hours, minutes, seconds];
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
  getValuePart(content) {
    const valuePart = document.createElement("span");
    valuePart.innerText = content;
    return valuePart;
  }
  getCheckBoxPart() {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    return checkBox;
  }
  getList(contentArr) {
    const listLi = document.createElement("li");
    listLi.append(
      this.getValuePart(contentArr[0]),
      this.getValuePart(contentArr[1]),
      this.getCheckBoxPart()
    );
    return listLi;
  }
  makeList(contentArr, item) {
    const targetLi = this.getList(contentArr);
    const targetNote = item.querySelector("ul");
    targetNote.appendChild(targetLi);
    targetNote.classList.remove("hidden");
    return targetLi;
  }
  resetForm(targetForm) {
    const targetChild = targetForm.childNodes;
    targetChild[5].remove();
    targetChild[1].value = "";
  }
  checkList(event) {
    const targetBox = event.target.closest("li");
    targetBox.classList.toggle("delete");
  }
  getMouseoverIcon(event) {
    const createdIcons = document.createElement("span");
    createdIcons.classList.add("mouseenterIcon");
    createdIcons.append(
      this.makeIcon("fas fa-backspace", "span"),
      this.makeIcon("fas fa-trash-alt", "span")
    );
    event.target.before(createdIcons);
    return createdIcons;
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
    const targetInputArray = targetForm.querySelectorAll("input");
    targetInputArray[0].setAttribute("readonly", true);
    const targetValue = targetInputArray[0].value;
    const timeForm = this.Viewer.getTimeForm();
    targetForm.appendChild(timeForm);
    const timeInput = timeForm.querySelector("input");
    timeInput.addEventListener("keyup", this.Viewer.getTimeType);
    timeForm.addEventListener("submit", (event) =>
      this.submitTimeEvent(event, targetValue)
    );
  }
  submitTimeEvent(event, targetValue) {
    event.preventDefault();
    const targetItem = event.target.closest("div"); // module_item
    const targetForm = event.target.parentNode;
    const targetChild = targetForm.childNodes;
    targetForm.querySelector("input").removeAttribute("readonly");

    const targetTime = targetChild[5].querySelector("input").value;
    const hours = targetTime.substr(0, 2);
    const minutes = targetTime.substr(3, 2);
    const seconds = targetTime.substr(6, 2);
    const remainedTime = this.getRemainedTime(hours, minutes, seconds);
    if (hours > 24 || minutes > 59 || seconds > 59) {
      this.Viewer.warningMention("WRONG TIME SETTING");
      return;
    }
    if (!remainedTime) {
      this.Viewer.warningMention("SETTING TIME ALREADY PASSED");
      return;
    }

    const contentArr = [remainedTime, targetValue];
    const list = this.Viewer.makeList(contentArr, targetItem);
    const listChild = list.childNodes;
    this.Viewer.resetForm(targetForm);
    const getInterval = (target) => {
      const interval = setInterval(() => {
        const resetTime = this.getRemainedTime(hours, minutes, seconds);
        target.innerHTML = resetTime;
      }, 1000);
      return interval;
    };
    const startInterval = getInterval(listChild[0]);
    listChild[2].addEventListener("click", this.Viewer.checkList.bind(this));
    listChild[0].addEventListener("mouseenter", (event) => {
      this.mouseoverEvent(event, startInterval, getInterval);
    });
  }

  mouseoverEvent(event, interval, getInterval) {
    console.log(event.target);
    clearInterval(interval);
    const newIcons = this.Viewer.getMouseoverIcon(event);
    event.target.remove();
    newIcons.addEventListener("mouseleave", (event) => {
      const restartInterval = getInterval(event.target);
      event.target.addEventListener("mouseenter", (event) => {
        this.mouseoverEvent(event, restartInterval, getInterval);
      });
    });
  }

  getRemainedTime(hours, minutes, seconds) {
    const comparedTime = this.compareTime(hours, minutes, seconds);
    if (comparedTime <= 0) return false;
    const resultHours = this.Viewer.makePadStart(parseInt(comparedTime / 3600));
    const resultMinutes = this.Viewer.makePadStart(
      parseInt((comparedTime % 3600) / 60)
    );
    const resultSeconds = this.Viewer.makePadStart(comparedTime % 60);
    const remainedTime = `${resultHours}:${resultMinutes}:${resultSeconds}`;
    return remainedTime;
  }

  compareTime(hours, minutes, seconds) {
    const currentTime = this.Viewer.getClock();
    const pasttime = new Date(...currentTime);
    const futureTime = new Date(
      currentTime[0], // year
      currentTime[1], // month
      currentTime[2], // day
      hours,
      minutes,
      seconds
    );
    const wholeSeconds = (futureTime - pasttime) / 1000;
    return wholeSeconds;
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
    setInterval(this.Viewer.getClock.bind(this.Viewer), 1000);
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
