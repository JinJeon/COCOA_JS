class handleList {
  constructor(value) {
    this.value = value;
    this.form = `${value}-form`;
    this.list = `${value}-list`;
    this.mention = "";
    this.formElement = document.getElementById(`${this.form}`);
    this.listElement = document.getElementById(`${this.list}`);
    this.warning = document.getElementById("warning");
    this.input = this.formElement.querySelector("input");
    this.deleteIcon = document.getElementById(`${this.value}_delete_icon`);
  }
  noticeWarning() {
    this.mention = "DOUBLE CLICK ICON TO DELETE ALL";
    this.warning.innerText = this.mention;
    this.warning.classList.remove("hidden");
  }
  ifAllDelete() {
    if (this.listElement.querySelector("li") === null) {
      this.listElement.classList.remove(`${this.value}_list`);
      this.deleteIcon.classList.add("hidden");
    }
  }
  makeDeleteIcon() {
    if (this.listElement.querySelectorAll("li").length === 1) {
      this.deleteIcon.classList.remove("hidden");
      this.deleteIcon.addEventListener("click", this.noticeWarning.bind(this));
      this.deleteIcon.addEventListener("dblclick", this.deleteAll.bind(this));
    }
  }
  deleteAll() {
    this.listElement.querySelectorAll("li").forEach((e) => e.remove());
    this.ifAllDelete();
    this.mention = "ALL DELETED";
    this.warning.innerText = this.mention;
  }

  deleteList(event) {
    const targetLi = event.target.closest("li");
    targetLi.remove();
    this.ifAllDelete();
  }

  checkList(event) {
    const targetBox = event.target.closest("li");
    targetBox.classList.toggle("delete");
  }

  makeList() {
    const toDoValue = this.input.value;
    const listLi = document.createElement("li");
    const valueSpan = document.createElement("span");
    const removeSpan = document.createElement("span");
    const removeIcon = document.createElement("i");
    const checkBox = document.createElement("input");
    valueSpan.innerText = toDoValue;
    checkBox.setAttribute("type", "checkbox");
    removeIcon.setAttribute("class", "fas fa-trash");

    removeSpan.appendChild(removeIcon);
    listLi.appendChild(removeSpan);
    listLi.appendChild(valueSpan);
    listLi.appendChild(checkBox);
    this.listElement.appendChild(listLi);
    this.listElement.classList.add(`${this.value}_list`);
    this.input.value = "";

    removeSpan.addEventListener("click", this.deleteList.bind(this));
    checkBox.addEventListener("click", this.checkList.bind(this));
    this.makeDeleteIcon();
  }
  handleToDoInput(event) {
    event.preventDefault();
    this.warning.classList.add("hidden");
    if (this.input.value === "") {
      this.mention = "FILL IN THE BLANK";
      this.warning.innerText = this.mention;
      this.warning.classList.remove("hidden");
      return;
    }
    this.makeList();
  }
}
const toDos = new handleList("todo");
const toHaves = new handleList("have");
toDos.formElement.addEventListener("submit", toDos.handleToDoInput.bind(toDos));
toHaves.formElement.addEventListener(
  "submit",
  toHaves.handleToDoInput.bind(toHaves)
);
