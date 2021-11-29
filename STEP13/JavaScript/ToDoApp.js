class ListData {
  constructor(name) {
    this.name = name;
    this.titleElement = document.getElementById(`${name}-title`);
    this.formElement = document.getElementById(`${name}-form`);
    this.listElement = document.getElementById(`${name}-list`);
    this.deleteIconElement = document.getElementById(`${name}-delete-icon`);
    this.formElementInput = this.formElement.querySelector("input");
    this.listArr = [];
  }
  setArrInfo() {
    this.listArr.push({ value: this.formElementInput.value, id: Date.now() });
    localStorage.setItem(`${this.value}`, JSON.stringify(this.listArr));
  }
  getArrInfo() {
    const savedArrInfo = localStorage.getItem(`${this.value}`);
    if (savedArrInfo !== null) {
      const parsedArrInfo = JSON.parse(savedArrInfo);
    }
  }
}

class ListViewer {
  constructor(ListData) {
    this.ListData = ListData;
    this.callDeleteIcon = this.ListData.deleteIconElement;
    this.warningElement = document.getElementById("warning");
    this.navItemArr = [
      { "list-alt": "ToDo" },
      { "calendar-alt": "calendar" },
      { clock: "alarm" },
    ];
    this.nav = document.querySelector("nav").querySelector("ul");
  }
  whatPageIs() {
    const link = document.URL;
    const extensionLength = 5;
    const linkName = link.substring(
      link.lastIndexOf("/") + 1,
      link.length - extensionLength
    );
    this.navItemArr.forEach((el, index) => {
      if (linkName === Object.values(el)[0]) {
        console.log("hi");
        this.nav
          .querySelectorAll("a")
          [index].querySelector("li")
          .classList.add("currentIcon");
      }
    });
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
  getValuePart() {
    const innerValue = this.ListData.formElementInput.value;
    const valuePart = document.createElement("span");
    valuePart.innerText = innerValue;
    return valuePart;
  }
  getCheckBoxPart() {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    return checkBox;
  }
  getListPart() {
    const listLi = document.createElement("li");
    listLi.append(
      this.makeIcon("fas fa-trash", "span"),
      this.makeIcon("far fa-edit", "span"),
      this.getValuePart(),
      this.getCheckBoxPart()
    );
    return listLi;
  }
  makeList() {
    const targetLi = this.getListPart();
    const valueListNode = this.ListData.listElement;
    valueListNode.appendChild(targetLi);
    valueListNode.classList.add("module_list");
    return targetLi;
  }
  // create list

  noticeWarning() {
    const warningElement = document.getElementById("warning");
    warningElement.innerText = "DOUBLE CLICK ICON TO DELETE ALL";
    warningElement.classList.remove("hidden");
  }
  ifAllDelete() {
    const valueListNode = this.ListData.listElement;
    if (valueListNode.querySelector("li") === null) {
      valueListNode.classList.remove("module_list");
      this.callDeleteIcon.classList.add("hidden");
    }
  }
  getDeleteAllIcon() {
    this.callDeleteIcon.classList.remove("hidden");
  }
  deleteAll() {
    this.ListData.listElement.querySelectorAll("li").forEach((e) => e.remove());
    this.ListViewer.ifAllDelete();
    const warning = document.querySelector("#warning");
    warning.innerText = `ALL DELETED (${this.ListData.titleElement.innerText})`;
  }
  deleteList(event) {
    const targetLi = event.target.closest("li");
    targetLi.remove();
    this.ListViewer.ifAllDelete();
  }
  getEditList() {
    const warningElement = document.getElementById("warning");
    const targetPart = event.target.closest("li").querySelectorAll("span")[2];
    const targetText = targetPart.innerText;
    if (targetPart.innerHTML.length <= 28) {
      targetPart.innerHTML = `<form><input type="text" placeholder=${targetText} value=${targetText} maxlength=15></form>`;
    }
    warningElement.innerText = "PRESS ENTER TO FINISH EDITING";
    warningElement.classList.remove("hidden");
  }
  postEditList(event) {
    event.preventDefault();
    const inputValue = event.target.querySelector("input").value;
    event.target.innerHTML = `${inputValue}`;
    this.warningElement.classList.add("hidden");
  }
  checkList(event) {
    const targetBox = event.target.closest("li");
    targetBox.classList.toggle("delete");
  }
  isBlank() {
    const warningElement = document.getElementById("warning");
    warningElement.classList.add("hidden");
    if (this.ListData.formElementInput.value !== "") return false;
    warningElement.innerText = "FILL IN THE BLANK";
    warningElement.classList.remove("hidden");
    return true;
  }
}
// create list performance

class ListController {
  constructor(ListData, ListViewer) {
    this.ListData = ListData;
    this.ListViewer = ListViewer;
  }
  deleteAllEvent() {
    const deleteIconNode = this.ListData.deleteIconElement;
    this.ListViewer.getDeleteAllIcon();
    deleteIconNode.addEventListener(
      "click",
      this.ListViewer.noticeWarning.bind(this)
    );
    deleteIconNode.addEventListener(
      "dblclick",
      this.ListViewer.deleteAll.bind(this)
    );
  }
  getEditListEvent(event) {
    this.ListViewer.getEditList();
    const targetPart = event.target.closest("li").querySelectorAll("span")[2];
    targetPart.addEventListener(
      "submit",
      this.ListViewer.postEditList.bind(this)
    );
  }
  inputListEvent(event) {
    event.preventDefault();
    if (this.ListViewer.isBlank()) return;
    const list = this.ListViewer.makeList();
    const listchild = list.childNodes;
    this.ListData.setArrInfo();
    this.ListData.getArrInfo();
    this.ListData.formElementInput.value = "";
    listchild[0].addEventListener(
      "click",
      this.ListViewer.deleteList.bind(this)
    );
    listchild[1].addEventListener("click", this.getEditListEvent.bind(this));
    listchild[3].addEventListener(
      "click",
      this.ListViewer.checkList.bind(this)
    );
    this.ListViewer.getDeleteAllIcon();
    this.deleteAllEvent();
  }
  printListEvent() {
    this.ListData.formElement.addEventListener(
      "submit",
      this.inputListEvent.bind(this)
    );
  }
}
const todoData = new ListData("todo");
const havingData = new ListData("having");
const todoViewer = new ListViewer(todoData);
const havingViewer = new ListViewer(havingData);
const todoController = new ListController(todoData, todoViewer);
const havingController = new ListController(havingData, havingViewer);
const init = function () {
  todoController.printListEvent();
  havingController.printListEvent();
  havingViewer.getNavigation();
};
init();
