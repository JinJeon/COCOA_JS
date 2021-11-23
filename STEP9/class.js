class listModel {
  constructor(value) {
    this.value = value;
    this.valueName = document.getElementById(`${value}-name`);
    this.valueForm = document.getElementById(`${value}-form`);
    this.valueList = document.getElementById(`${value}-list`);
    this.warning = document.getElementById("warning");
    this.deleteIcon = document.getElementById(`${value}-delete-icon`);
    this.valueFormInput = this.valueForm.querySelector("input");
    this.valueListLi = this.valueList.querySelector("li");
    this.valueListLiAll = this.valueList.querySelectorAll("li");
  }
}

class listView {
  constructor(listModel) {
    this.listModel = listModel;
  }
  /* 추후 사용 예정
  renderContainer() {
    const container = document.getElementById("sum-container");
    container.append(`
    <div class="module_item">
      <div class="module_container"> 
        <span id="${this.listModel.value}-name">DO IT</span>
        <span id="${this.listModel.value}-delete-icon" class="hidden"><i class="fas fa-trash"></i></span>
      </div>
      <form id="${this.listModel.value}-form" class="module_form">
        <input type="text" placeholder="NEW TASK" maxlength=15>
        <input type="submit" value="+">
      </form>
      <ul id="${this.listModel.value}-list"> 
      </ul>
    </div>
    `);
  }
  */

  getValueSpan() {
    const innerValue = this.listModel.valueFormInput.value;
    const valueSpan = document.createElement("span");
    valueSpan.innerText = innerValue;
    return valueSpan;
  }
  getRemoveSpan() {
    const removeSpan = document.createElement("span");
    const removeIcon = document.createElement("i");
    removeIcon.setAttribute("class", "fas fa-trash");
    removeSpan.appendChild(removeIcon);
    return removeSpan;
  }
  getEditSpan() {
    const editSpan = document.createElement("span");
    const editIcon = document.createElement("i");
    editIcon.setAttribute("class", "far fa-edit");
    editSpan.appendChild(editIcon);
    return editSpan;
  }
  getCheckBox() {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    return checkBox;
  }
  getlistLi() {
    const listLi = document.createElement("li");
    listLi.append(
      this.getRemoveSpan(),
      this.getEditSpan(),
      this.getValueSpan(),
      this.getCheckBox()
    );
    return listLi;
  }
  makeList() {
    const targetLi = this.getlistLi();
    this.listModel.valueList.appendChild(targetLi);
    this.listModel.valueList.classList.add("module_list");
    this.listModel.valueFormInput.value = "";
    return targetLi;
  }
  // create list

  noticeWarning() {
    this.listModel.warning.innerText = "DOUBLE CLICK ICON TO DELETE ALL";
    this.listModel.warning.classList.remove("hidden");
  }
  ifAllDelete() {
    if (this.listModel.valueList.querySelector("li") === null) {
      this.listModel.valueList.classList.remove("module_list");
      this.listModel.deleteIcon.classList.add("hidden");
    }
  }
  getDeleteAllIcon() {
    this.listModel.deleteIcon.classList.remove("hidden");
  }
  deleteAll() {
    this.listModel.valueListLiAll.forEach((e) => e.remove());
    this.listView.ifAllDelete();
    this.listModel.warning.innerText = `ALL DELETED (${this.listModel.valueName.innerText})`;
  }
  deleteList(event) {
    const targetLi = event.target.closest("li");
    targetLi.remove();
    this.listView.ifAllDelete();
  }
  getEditList() {
    const targetSpan = event.target.closest("li").querySelectorAll("span")[2];
    const targetValue = targetSpan.innerText;
    if (targetSpan.innerHTML.length <= 28) {
      targetSpan.innerHTML = `<form><input type="text" placeholder=${targetValue} value=${targetValue} maxlength=15></form>`;
    }
    this.listModel.warning.innerText = "PRESS ENTER TO FINISH EDITING";
    this.listModel.warning.classList.remove("hidden");
  }
  postEditList(event) {
    event.preventDefault();
    const inputValue = event.target.querySelector("input").value;
    event.target.innerHTML = `${inputValue}`;
    this.listModel.warning.classList.add("hidden");
  }
  checkList(event) {
    const targetBox = event.target.closest("li");
    targetBox.classList.toggle("delete");
  }
  filterBlank() {
    this.listModel.warning.classList.add("hidden");
    if (this.listModel.valueFormInput.value === "") {
      this.listModel.warning.innerText = "FILL IN THE BLANK";
      this.listModel.warning.classList.remove("hidden");
      return false;
    }
    return true;
  }
}
// create list performance

class listController {
  constructor(listModel, listView) {
    this.listModel = listModel;
    this.listView = listView;
  }
  getDeleteAllEvent() {
    if (this.listModel.valueListLiAll.length === 1) {
      this.listView.getDeleteAllIcon();
      this.listModel.deleteIcon.addEventListener(
        "click",
        this.listView.noticeWarning.bind(this)
      );
      this.listModel.deleteIcon.addEventListener(
        "dblclick",
        this.listView.deleteAll.bind(this)
      );
    }
  }
  getEditListEvent(event) {
    this.listView.getEditList();
    const targetSpan = event.target.closest("li").querySelectorAll("span")[2];
    targetSpan.addEventListener(
      "submit",
      this.listView.postEditList.bind(this)
    );
  }
  inputListEvent(event) {
    event.preventDefault();
    if (!this.listView.filterBlank()) return;
    const spanArr = this.listView.makeList().childNodes;
    spanArr[0].addEventListener("click", this.listView.deleteList.bind(this));
    spanArr[1].addEventListener("click", this.getEditListEvent.bind(this));
    spanArr[3].addEventListener("click", this.listView.checkList.bind(this));
    this.listView.getDeleteAllIcon();
    this.getDeleteAllEvent();
  }
  printListEvent() {
    this.listModel.valueForm.addEventListener(
      "submit",
      this.inputListEvent.bind(this)
    );
  }
}
const todoModel = new listModel("todo");
const haveModel = new listModel("have");
const todoView = new listView(todoModel);
const haveView = new listView(haveModel);
const todoController = new listController(todoModel, todoView);
const haveController = new listController(haveModel, haveView);
const init = function () {
  todoController.printListEvent();
  haveController.printListEvent();
};
init();
