class Data {
  constructor(menuArr) {
    this.menuArr = menuArr;
    this.counterArr = this.menuArr.map((el) => (el = { [el]: null }));
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
  drawList() {
    const newLists = document.createElement("ul");
    newLists.classList.add("hidden");
    this.Data.menuArr.forEach((el) => {
      const newChild = document.createElement("li");
      newChild.innerHTML = el;
      newLists.appendChild(newChild);
    });
    this.list.appendChild(newLists);
  }
  getCounter() {
    const appendedPart = document.createElement("ul");
    this.Data.counterArr.forEach((el) => {
      const appendedChild = document.createElement("li");
      appendedChild.classList.add("hidden");
      appendedChild.innerHTML = `${Object.keys(el)} : ${Object.values(el)}`;
      appendedPart.appendChild(appendedChild);
    });
    this.counter.appendChild(appendedPart);
  }

  showAllParts() {
    this.list.querySelector("ul").classList.remove("hidden");
    const counterPart = this.counter.querySelector("ul");
    if (counterPart) counterPart.classList.remove("hidden");
  }
  hideAllParts() {
    this.list.querySelector("ul").classList.add("hidden");
    const counterPart = this.counter.querySelector("ul");
    if (counterPart) counterPart.classList.add("hidden");
  }

  drawCounter() {
    this.counter
      .querySelector("ul")
      .querySelectorAll("li")
      .forEach((el) => {
        const targetCounter = this.Data.target;
        const dataName = Object.keys(targetCounter)[0];
        const listName = el.innerHTML.replace(/\s:\s|\d+(?!\:)/g, "");
        if (dataName === listName) {
          el.classList.remove("hidden");
          el.innerHTML = `${Object.keys(targetCounter)} : ${Object.values(
            targetCounter
          )}`;
        }
      });
  }
}

class EventController {
  constructor(Data, Viewer) {
    this.Data = Data;
    this.Viewer = Viewer;
  }
  countMousemove(event) {
    this.Data.countText(event.target.innerHTML);
    this.Viewer.drawCounter();
  }
  mouseenterHandler() {
    const timer = setTimeout(this.Viewer.showAllParts.bind(this.Viewer), 1000);
    const stopTimer = () => {
      clearTimeout(timer);
    };
    this.Viewer.list.addEventListener("mouseleave", stopTimer);
  }
  showAndHideEvent() {
    const listNode = this.Viewer.list;
    listNode.addEventListener("mouseenter", this.mouseenterHandler.bind(this));
    listNode.addEventListener(
      "mouseleave",
      this.Viewer.hideAllParts.bind(this.Viewer)
    );
  }
  listMousemoveEvent() {
    this.Viewer.list
      .querySelector("ul")
      .querySelectorAll("li")
      .forEach((el) => {
        el.addEventListener("mousemove", this.countMousemove.bind(this));
      });
  }
  getAllLists() {
    this.Viewer.drawList();
    this.Viewer.getCounter();
    this.showAndHideEvent();
    this.listMousemoveEvent();
  }
}

const menuArr = ["AIR", "BANANA", "COCOA", "DOOR", "EAR", "FONT"];
const init = () => {
  const counterData = new Data(menuArr);
  const listViewer = new Viewer(counterData);
  const listEventController = new EventController(counterData, listViewer);
  listEventController.getAllLists();
};
init();
