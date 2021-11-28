class Data {
  constructor(menuArr, counterArr) {
    this.menuArr = menuArr;
    this.counterArr = counterArr;
    this.target;
  }
  countText(text) {
    this.counterArr.forEach((el) => {
      if (el[text] !== undefined) {
        el[text] = el[text] + 1;
        this.target = el;
      }
    });
  }
}

class Viewer {
  constructor(Data) {
    this.Data = Data;
    this.list = document.querySelector(".list");
    this.counter = document.querySelector(".counter");
  }
  drawLists() {
    const newLists = document.createElement("ul");
    newLists.classList.add("hidden");
    this.Data.menuArr.forEach((el) => {
      const newChild = document.createElement("li");
      newChild.innerHTML = el;
      newLists.appendChild(newChild);
    });
    this.list.appendChild(newLists);
  }
  showLists() {
    this.list.querySelector("ul").classList.remove("hidden");
  }
  hideLists() {
    this.list.querySelector("ul").classList.add("hidden");
  }
  getCounterList() {
    const counterLists = this.counter.querySelector("ul");
    if (counterLists) {
      counterLists.remove();
    }
    const appendedLists = document.createElement("ul");
    this.Data.counterArr.forEach((el) => {
      const appendedPart = document.createElement("li");
      appendedPart.classList.add("hidden");
      appendedPart.innerHTML = `${Object.keys(el)} : ${Object.values(el)}`;
      appendedLists.appendChild(appendedPart);
    });
    this.counter.appendChild(appendedLists);
  }
  drawCounter() {
    this.counter
      .querySelector("ul")
      .querySelectorAll("li")
      .forEach((el) => {
        const dataName = Object.keys(this.Data.target)[0];
        const listName = el.innerHTML.replace(/\s:\s\d+/gi, "");
        console.log(dataName === listName);
        if (dataName === listName) {
          el.classList.remove("hidden");
        }
      });
  }
}

class EventController {
  constructor(Data, Viewer) {
    this.Data = Data;
    this.Viewer = Viewer;
  }
  counterMousemoveHandler(event) {
    const target = event.target;
    target.removeEventListener("mousemove", this.counterMousemoveHandler);
    const getCounterMousemoveEvent = function () {
      target.addEventListener("mousemove", this.counterMousemoveHandler);
    };
    setTimeout(getCounterMousemoveEvent, 500);
    this.Viewer.getCounterList();
    this.Data.countText(target.innerHTML);
    this.Viewer.drawCounter();
  }
  mouseenterHandler() {
    const timer = setTimeout(this.Viewer.showLists.bind(this.Viewer), 1000);
    const stopTimer = () => {
      clearTimeout(timer);
    };
    this.Viewer.list.addEventListener("mouseleave", stopTimer);
  }
  getMouseEvent() {
    const listNode = this.Viewer.list;
    this.Viewer.drawLists();
    listNode.addEventListener("mouseenter", this.mouseenterHandler.bind(this));
    listNode.addEventListener(
      "mouseleave",
      this.Viewer.hideLists.bind(this.Viewer)
    );
    listNode
      .querySelector("ul")
      .querySelectorAll("li")
      .forEach((el) => {
        el.addEventListener(
          "mousemove",
          this.counterMousemoveHandler.bind(this)
        );
      });
  }
}

const menuArr = ["AIR", "BANANA", "COCOA", "DOOR", "EAR", "FONT"];
const init = () => {
  const menuArrWithCounter = menuArr.map((el) => (el = { [el]: null }));
  const counterData = new Data(menuArr, menuArrWithCounter);
  const listViewer = new Viewer(counterData);
  const listEventController = new EventController(counterData, listViewer);
  listEventController.getMouseEvent();
};
init();
