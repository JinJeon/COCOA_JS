class ListData {
  constructor(name) {
    this.name = name;
    this.listArr = [];
  }
}

class ListViewer {
  constructor(ListData) {
    this.ListData = ListData;
    this.titleElement = document.getElementById(`${this.ListData.name}-title`);
    this.formElement = document.getElementById(`${this.ListData.name}-form`);
    this.listElement = document.getElementById(`${this.ListData.name}-list`);
    this.deleteIconElement = document.getElementById(
      `${this.ListData.name}-delete-icon`
    );
    this.formElementInput = this.formElement.querySelector("input");
    this.warningElement = document.querySelector("#warning");
    this.sumContainer = document.querySelector(".sum_container");
    this.navItemArr = [
      { "list-alt": "ToDo" },
      { "calendar-alt": "calendar" },
      { clock: "alarm" },
    ];
    this.nav = document.querySelector("nav").querySelector("ul");
    this.addNewListBtn = document.querySelector(".add_new_list").childNodes[1];
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
    const innerValue = this.formElementInput.value;
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
    this.listElement.appendChild(targetLi);
    this.listElement.classList.add("module_list");
    return targetLi;
  }
  // create list

  noticeDblclick() {
    const warningElement = document.getElementById("warning");
    warningElement.innerText = "DOUBLE CLICK ICON TO DELETE ALL";
    warningElement.classList.remove("hidden");
  }
  ifAllDelete() {
    const valueListNode = this.listElement;
    if (valueListNode.querySelector("li") === null) {
      valueListNode.classList.remove("module_list");
      this.deleteIconElement.classList.add("hidden");
    }
  }
  getDeleteAllIcon() {
    this.deleteIconElement.classList.remove("hidden");
  }
  deleteAll() {
    this.listElement.querySelectorAll("li").forEach((e) => e.remove());
    this.ifAllDelete();
    this.warningElement.innerText = `ALL DELETED (${this.titleElement.innerText})`;
  }
  deleteList(event) {
    const targetLi = event.target.closest("li");
    targetLi.remove();
    this.ListViewer.ifAllDelete();
  }
  getEditList() {
    const targetPart = event.target.closest("li").querySelectorAll("span")[2];
    const targetText = targetPart.innerText;
    if (targetPart.innerHTML.length <= 28) {
      targetPart.innerHTML = `<form><input type="text" placeholder=${targetText} value=${targetText} maxlength=15></form>`;
    }
    this.warningElement.innerText = "PRESS ENTER TO FINISH EDITING";
    this.warningElement.classList.remove("hidden");
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
  isBlank(submittedContent) {
    this.warningElement.classList.add("hidden");
    if (submittedContent !== "") return false;
    this.warningElement.innerText = "FILL IN THE BLANK";
    this.warningElement.classList.remove("hidden");
    return true;
  }
  showNameInputForm(event) {
    event.target
      .closest("div")
      .querySelector("form")
      .classList.toggle("hidden");
  }

  removeAndDrawNewList(event, title) {
    event.preventDefault();
    event.target.closest("div").remove();
    const name = `${title}`.replace(" ", "").toLowerCase();
    const listItem = document.createElement("div");
    listItem.classList.add("module_item");
    listItem.innerHTML = `
    <div class="module_container">
      <span id="${name}-title">${title}</span>
      <span id="${name}-delete-icon" class="hidden"><i class="fas fa-trash"></i></span>
    </div>
    <form id="${name}-form" class="module_form">
      <input type="text" placeholder="TYPE AND PRESS ENTER" maxlength=30>
      <input type="submit" value="+">
    </form>
    <ul id="${name}-list">
    </ul>
    `;
    const btnItem = document.createElement("div");
    btnItem.classList.add("add_new_list");
    btnItem.innerHTML = `
    <span><i class="fas fa-clipboard-list"></i></span>
    <p>
    <form class="hidden">
      <input type="text" placeholder="LIST NAME" maxlength=10>
    </form>
    `;
    this.sumContainer.append(listItem, btnItem);
  }
}
// create list performance

class ListController {
  constructor(ListData, ListViewer) {
    this.ListData = ListData;
    this.ListViewer = ListViewer;
  }
  deleteAllEvent() {
    const deleteIconNode = this.ListViewer.deleteIconElement;
    this.ListViewer.getDeleteAllIcon();
    deleteIconNode.addEventListener(
      "click",
      this.ListViewer.noticeDblclick.bind(this)
    );
    deleteIconNode.addEventListener(
      "dblclick",
      this.ListViewer.deleteAll.bind(this.ListViewer)
    );
  }
  getEditListEvent(event) {
    this.ListViewer.getEditList();
    const targetPart = event.target.closest("li").querySelectorAll("span")[2];
    targetPart.addEventListener(
      "submit",
      this.ListViewer.postEditList.bind(this.ListViewer)
    );
  }
  submitListEvent(event) {
    event.preventDefault();
    const submittedContent = event.target.querySelector("input").value;
    if (this.ListViewer.isBlank(submittedContent)) return;
    const list = this.ListViewer.makeList();
    const listchild = list.childNodes;
    this.ListViewer.formElementInput.value = "";
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
  getSubmitListEvent() {
    this.ListViewer.formElement.addEventListener(
      "submit",
      this.submitListEvent.bind(this)
    );
  }
  submitNameInputFromEvent(event) {
    event.preventDefault();
    const listTitle = event.target.querySelector("input").value;
    if (this.ListViewer.isBlank(listTitle)) return;
    this.ListViewer.removeAndDrawNewList(event, listTitle);
    const madeData = new ListData(`${listTitle}`);
    const madeViewer = new ListViewer(madeData);
    const madeController = new ListController(madeData, madeViewer);
    madeController.getSubmitListEvent();
    madeController.getClickEventInAddBtn();
  }
  clickAddBtnEvent(event) {
    this.ListViewer.showNameInputForm(event);
    const nameInputForm = event.target.closest("div").querySelector("form");
    nameInputForm.addEventListener(
      "submit",
      this.submitNameInputFromEvent.bind(this)
    );
  }
  getClickEventInAddBtn() {
    const addBtn = document.querySelector(".add_new_list").childNodes[1];
    console.log(document.querySelector(".add_new_list"));
    addBtn.addEventListener("click", this.clickAddBtnEvent.bind(this));
  }
}
const todoData = new ListData("todo");
const tohaveData = new ListData("tohave");
const todoViewer = new ListViewer(todoData);
const tohaveViewer = new ListViewer(tohaveData);
const todoController = new ListController(todoData, todoViewer);
const tohaveController = new ListController(tohaveData, tohaveViewer);
const init = function () {
  todoViewer.getNavigation();
  todoController.getClickEventInAddBtn();
  todoController.getSubmitListEvent();
  tohaveController.getSubmitListEvent();
};
init();
