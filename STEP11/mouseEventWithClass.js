const selector = {
  list: document.querySelector(".list"),
  listContents: document.querySelector(".list-content"),
  result: document.querySelector(".result"),
  listContentsArr: document
    .querySelector(".list-content")
    .querySelectorAll("li"),
};

class Data {
  constructor(arr) {
    this.arr = arr;
  }
  addCounter = (text) => {
    this.arr.forEach((el) => {
      if (el[text] !== undefined) {
        el[text] = el[text] + 1;
      }
    });
    console.log(this.arr);
  };
}
class Viewer {
  showContents = () => {
    selector.listContents.classList.remove("hidden");
  };
  hideContents = () => {
    selector.listContents.classList.add("hidden");
  };
}

class EventController {
  constructor(Data, Viewer) {
    this.Data = Data;
    this.Viewer = Viewer;
  }
  contentsMousemoveHandler = (event) => {
    const targetText = event.target.innerHTML;
    this.Data.addCounter(targetText);
  };
  mouseenterHandler = () => {
    const timer = setTimeout(this.Viewer.showContents, 1000);
    const stopTimer = () => {
      clearTimeout(timer);
    };
    selector.list.addEventListener("mouseleave", stopTimer);
  };
  getMouseEvent = () => {
    console.log(this);
    const listNode = selector.list;
    listNode.addEventListener("mouseenter", this.mouseenterHandler);
    listNode.addEventListener("mouseleave", this.Viewer.hideContents);
    selector.listContentsArr.forEach((el) =>
      el.addEventListener("mousemove", this.contentsMousemoveHandler)
    );
  };
}

const init = () => {
  const counterArr = [];
  selector.listContentsArr.forEach((el) =>
    counterArr.push({ [el.innerHTML]: null })
  );
  const counterData = new Data(counterArr);
  const listViewer = new Viewer();
  const listEventController = new EventController(counterData, listViewer);
  listEventController.getMouseEvent();
};
init();
