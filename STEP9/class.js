const $ = (element) => document.querySelector(`${element}`);
class partition {
  constructor(value) {
    this.value = value;
    this.valueName = document.getElementById(`${value}-name`);
    this.valueForm = document.getElementById(`${value}-form`);
    this.valueList = document.getElementById(`${value}-list`);
    this.deleteIcon = document.getElementById(`${value}-delete-icon`);
    this.valueFormInput = this.valueForm.querySelector("input");
    this.listArr = [];
  }
  getArrInfo() {
    this.listArr.push(this.valueFormInput.value);
    localStorage.setItem(`${this.value}`, JSON.stringify(this.listArr));
  }
}

class listViewer {
  constructor(partition) {
    this.partition = partition;
    this.callDeleteIcon = this.partition.deleteIcon;
  }
  getValuePart() {
    const innerValue = this.partition.valueFormInput.value;
    const valuePart = document.createElement("span");
    valuePart.innerText = innerValue;
    return valuePart;
  }
  makeIcon(figure) {
    const span = document.createElement("span");
    const icon = document.createElement("i");
    icon.setAttribute("class", `${figure}`);
    span.appendChild(icon);
    return span;
  }
  getCheckBox() {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    return checkBox;
  }
  getlistLi() {
    const listLi = document.createElement("li");
    listLi.append(
      this.makeIcon("fas fa-trash"),
      this.makeIcon("far fa-edit"),
      this.getValuePart(),
      this.getCheckBox()
    );
    return listLi;
  }
  makeList() {
    const targetLi = this.getlistLi();
    const valueListNode = this.partition.valueList;
    valueListNode.appendChild(targetLi);
    valueListNode.classList.add("module_list");
    return targetLi;
  }
  // create list

  noticeWarning() {
    $("#warning").innerText = "DOUBLE CLICK ICON TO DELETE ALL";
    $("#warning").classList.remove("hidden");
  }
  ifAllDelete() {
    const valueListNode = this.partition.valueList;
    if (valueListNode.querySelector("li") === null) {
      valueListNode.classList.remove("module_list");
      this.callDeleteIcon.classList.add("hidden");
    }
  }
  getDeleteAllIcon() {
    this.callDeleteIcon.classList.remove("hidden");
  }
  deleteAll() {
    this.partition.valueList.querySelectorAll("li").forEach((e) => e.remove());
    this.listViewer.ifAllDelete();
    $(
      "#warning"
    ).innerText = `ALL DELETED (${this.partition.valueName.innerText})`;
  }
  deleteList(event) {
    const targetLi = event.target.closest("li");
    targetLi.remove();
    this.listViewer.ifAllDelete();
  }
  getEditList() {
    const targetPart = event.target.closest("li").querySelectorAll("span")[2];
    const targetValue = targetPart.innerText;
    if (targetPart.innerHTML.length <= 28) {
      targetPart.innerHTML = `<form><input type="text" placeholder=${targetValue} value=${targetValue} maxlength=15></form>`;
    }
    $("#warning").innerText = "PRESS ENTER TO FINISH EDITING";
    $("#warning").classList.remove("hidden");
  }
  postEditList(event) {
    event.preventDefault();
    const inputValue = event.target.querySelector("input").value;
    event.target.innerHTML = `${inputValue}`;
    $("#warning").classList.add("hidden");
  }
  checkList(event) {
    const targetBox = event.target.closest("li");
    targetBox.classList.toggle("delete");
  }
  isBlank() {
    $("#warning").classList.add("hidden");
    if (this.partition.valueFormInput.value !== "") return false;
    $("#warning").innerText = "FILL IN THE BLANK";
    $("#warning").classList.remove("hidden");
    return true;
  }
}
// create list performance

class listController {
  constructor(partition, listViewer) {
    this.partition = partition;
    this.listViewer = listViewer;
    this.callDeleteIcon = this.partition.deleteIcon;
  }
  deleteAllEvent() {
    this.listViewer.getDeleteAllIcon();
    this.callDeleteIcon.addEventListener(
      "click",
      this.listViewer.noticeWarning.bind(this)
    );
    this.callDeleteIcon.addEventListener(
      "dblclick",
      this.listViewer.deleteAll.bind(this)
    );
  }
  getEditListEvent(event) {
    this.listViewer.getEditList();
    const targetPart = event.target.closest("li").querySelectorAll("span")[2];
    targetPart.addEventListener(
      "submit",
      this.listViewer.postEditList.bind(this)
    );
  }
  inputListEvent(event) {
    event.preventDefault();
    if (this.listViewer.isBlank()) return;
    const list = this.listViewer.makeList();
    const listchild = list.childNodes;
    this.partition.getArrInfo();
    this.partition.valueFormInput.value = "";
    listchild[0].addEventListener(
      "click",
      this.listViewer.deleteList.bind(this)
    );
    listchild[1].addEventListener("click", this.getEditListEvent.bind(this));
    listchild[3].addEventListener(
      "click",
      this.listViewer.checkList.bind(this)
    );
    this.listViewer.getDeleteAllIcon();
    this.deleteAllEvent();
  }
  printListEvent() {
    this.partition.valueForm.addEventListener(
      "submit",
      this.inputListEvent.bind(this)
    );
  }
}
const todoModel = new partition("todo");
const havingModel = new partition("having");
const todoView = new listViewer(todoModel);
const havingView = new listViewer(havingModel);
const todoController = new listController(todoModel, todoView);
const havingController = new listController(havingModel, havingView);
const init = function () {
  todoController.printListEvent();
  havingController.printListEvent();
};
init();
