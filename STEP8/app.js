class handleList {
  constructor(value) {
    this.value = value;
    this.mention = "";
    this.formElement = document.getElementById(`${this.value}-form`);
    this.listElement = document.getElementById(`${this.value}-list`);
    this.nameElement = document.getElementById(`${this.value}-name`);
    this.warning = document.getElementById("warning");
    this.input = this.formElement.querySelector("input");
    this.deleteIcon = document.getElementById(`${this.value}-delete-icon`);
  }
  noticeWarning() {
    this.mention = "DOUBLE CLICK ICON TO DELETE ALL";
    this.warning.innerText = this.mention;
    this.warning.classList.remove("hidden");
  }
  ifAllDelete() {
    if (this.listElement.querySelector("li") === null) {
      this.listElement.classList.remove("module_list");
      this.deleteIcon.classList.add("hidden");
    }
  }
  getDeleteAllIcon() {
    if (this.listElement.querySelectorAll("li").length === 1) {
      this.deleteIcon.classList.remove("hidden");
      this.deleteIcon.addEventListener("click", this.noticeWarning.bind(this));
      this.deleteIcon.addEventListener("dblclick", this.deleteAll.bind(this));
    }
  }
  deleteAll() {
    this.listElement.querySelectorAll("li").forEach((e) => e.remove());
    this.ifAllDelete();
    this.mention = `ALL DELETED (${this.nameElement.innerText})`;
    this.warning.innerText = this.mention;
  }

  deleteList(event) {
    const targetLi = event.target.closest("li");
    targetLi.remove();
    this.ifAllDelete();
  }
  getEditList(event) {
    const targetSpan = event.target.closest("li").querySelectorAll("span")[2];
    const targetValue = targetSpan.innerText;
    console.log(targetSpan);
    console.log(targetSpan.innerHTML.length);
    if (targetSpan.innerHTML.length <= 28) {
      targetSpan.innerHTML = `<form><input type="text" placeholder=${targetValue} value=${targetValue} maxlength=15></form>`;
    }
    targetSpan.addEventListener("submit", this.postEditList.bind(this));
  }
  postEditList(event) {
    event.preventDefault();
    const inputValue = event.target.querySelector("input").value;
    event.target.innerHTML = `${inputValue}`;
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
    const editSpan = document.createElement("span");
    const editIcon = document.createElement("i");
    const checkBox = document.createElement("input");
    valueSpan.innerText = toDoValue;
    editIcon.setAttribute("class", "far fa-edit");
    checkBox.setAttribute("type", "checkbox");
    removeIcon.setAttribute("class", "fas fa-trash");

    removeSpan.appendChild(removeIcon);
    listLi.appendChild(removeSpan);
    editSpan.appendChild(editIcon);
    listLi.appendChild(editSpan);
    listLi.appendChild(valueSpan);
    listLi.appendChild(checkBox);
    listLi.setAttribute("id", Date.now());
    this.listElement.appendChild(listLi);
    this.listElement.classList.add("module_list");
    this.input.value = "";

    removeSpan.addEventListener("click", this.deleteList.bind(this));
    editSpan.addEventListener("click", this.getEditList.bind(this));
    checkBox.addEventListener("click", this.checkList.bind(this));
    this.getDeleteAllIcon();
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
