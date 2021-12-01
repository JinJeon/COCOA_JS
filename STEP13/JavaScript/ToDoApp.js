class ListData {
  constructor(name) {
    this.name = name;
    this.listArr = [];
  }
}

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

class ListViewer {
  constructor(ListData) {
    this.ListData = ListData;
    this.warningElement = document.querySelector(".warning");
    this.sumContainer = document.querySelector(".sum_container");
    this.addNewListBtn = document.querySelector(".add_new_list").childNodes[1];
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
  getListPart(content) {
    const listLi = document.createElement("li");
    listLi.append(
      this.makeIcon("fas fa-trash", "span"),
      this.makeIcon("far fa-edit", "span"),
      this.getValuePart(content),
      this.getCheckBoxPart()
    );
    return listLi;
  }
  makeList(content, item) {
    const targetLi = this.getListPart(content);
    const targetNote = item.querySelector("ul");
    targetNote.appendChild(targetLi);
    targetNote.classList.add("module_list");
    return targetLi;
  }
  // create list

  noticeDblclick() {
    const warningElement = document.getElementById("warning");
    warningElement.innerText = "DOUBLE CLICK ICON TO DELETE ALL";
    warningElement.classList.remove("hidden");
  }
  ifAllDelete(targetForm) {
    const targetList = targetForm.querySelector("ul");
    const targetIcon = targetForm.querySelector(".delete_icon");
    if (targetList.querySelector("li") === null) {
      targetList.classList.remove("module_list");
      targetIcon.classList.add("hidden");
    }
  }
  showDeleteAllIcon(item) {
    const deleteIcon = item.querySelector(".delete_icon");
    deleteIcon.classList.remove("hidden");
  }
  deleteAll(event) {
    // event target은 delete_icon
    const targetItem = event.target.closest("div").parentNode;
    const targetTitle = targetItem.querySelector(".title");
    const listArray = event.target
      .closest("div")
      .parentNode.querySelectorAll("li");
    listArray.forEach((el) => el.remove());
    this.ifAllDelete(targetItem);
    this.warningElement.innerText = `ALL DELETED (${targetTitle.innerText})`;
  }
  deleteList(event) {
    const targetForm = event.target.closest("div");
    const targetLi = event.target.closest("li");
    targetLi.remove();
    this.ListViewer.ifAllDelete(targetForm);
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

  removeAndDrawNewList(event, title, name) {
    event.preventDefault();
    event.target.closest("div").remove();
    console.log();
    const listItem = document.createElement("div");
    listItem.classList.add("module_item");
    listItem.innerHTML = `
    <div class="module_container">
      <span id="${name}-title" class="title">${title}</span>
      <span class="delete_icon hidden"><i class="fas fa-trash"></i></span>
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
  getDeleteAllEvent(item) {
    const deleteIcon = item.querySelector(".delete_icon");
    deleteIcon.addEventListener(
      "click",
      this.ListViewer.noticeDblclick.bind(this)
    );
    deleteIcon.addEventListener(
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
    const targetItem = event.target.closest("div");
    const submittedContent = event.target.querySelector("input").value;
    if (this.ListViewer.isBlank(submittedContent)) return;
    const list = this.ListViewer.makeList(submittedContent, targetItem);
    const listchild = list.childNodes;
    event.target.querySelector("input").value = "";
    listchild[0].addEventListener(
      "click",
      this.ListViewer.deleteList.bind(this)
    );
    listchild[1].addEventListener("click", this.getEditListEvent.bind(this));
    listchild[3].addEventListener(
      "click",
      this.ListViewer.checkList.bind(this)
    );
    this.ListViewer.showDeleteAllIcon(targetItem);
    this.getDeleteAllEvent(targetItem);
    // event.target은 submit form
  }
  getSubmitListEvent() {
    const targetForm = document.querySelectorAll(".module_form");
    console.log(targetForm);
    targetForm.forEach((el) => {
      el.addEventListener("submit", this.submitListEvent.bind(this));
    });
  }
  submitNameInputFromEvent(event) {
    event.preventDefault();
    const listTitle = event.target.querySelector("input").value;
    const listName = listTitle.replace(" ", "").toLowerCase();
    if (this.ListViewer.isBlank(listTitle)) return;
    this.ListViewer.removeAndDrawNewList(event, listTitle, listName);
    const madeData = new ListData(`${listName}`);
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
    addBtn.addEventListener("click", this.clickAddBtnEvent.bind(this));
  }
}

const todoData = new ListData("todo");
const todoViewer = new ListViewer(todoData);
const todoController = new ListController(todoData, todoViewer);
// const tohaveData = new ListData("tohave");
// const tohaveViewer = new ListViewer(tohaveData);
// const tohaveController = new ListController(tohaveData, tohaveViewer);
const navigator = new NavigatorViewer([
  { "list-alt": "ToDo" },
  { "calendar-alt": "calendar" },
  { clock: "alarm" },
]);

const init = function () {
  navigator.getNavigation();
  todoController.getSubmitListEvent();
  todoController.getClickEventInAddBtn();
  // tohaveController.getSubmitListEvent();
};
init();
