class handleList {
  constructor(value) {
    this.mention = "";
    this.formElement = document.getElementById(`${value}-form`);
    this.listElement = document.getElementById(`${value}-list`);
    this.nameElement = document.getElementById(`${value}-name`);
    this.warning = document.getElementById("warning");
    this.input = this.formElement.querySelector("input");
    this.deleteIcon = document.getElementById(`${value}-delete-icon`);
  }
  noticeWarning() {
    this.warning.innerText = "DOUBLE CLICK ICON TO DELETE ALL";
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
    this.warning.innerText = `ALL DELETED (${this.nameElement.innerText})`;
  }

  deleteList(event) {
    const targetLi = event.target.closest("li");
    targetLi.remove();
    this.ifAllDelete();
  }
  getEditList(event) {
    const targetSpan = event.target.closest("li").querySelectorAll("span")[2];
    const targetValue = targetSpan.innerText;
    if (targetSpan.innerHTML.length <= 28) {
      targetSpan.innerHTML = `<form><input type="text" placeholder=${targetValue} value=${targetValue} maxlength=15></form>`;
    }
    targetSpan.addEventListener("submit", this.postEditList.bind(this));
    this.mention = "PRESS ENTER TO FINISH EDITING";
    this.warning.innerText = this.mention;
    this.warning.classList.remove("hidden");
  }
  postEditList(event) {
    event.preventDefault();
    const inputValue = event.target.querySelector("input").value;
    event.target.innerHTML = `${inputValue}`;
    this.warning.classList.add("hidden");
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
    this.listElement.appendChild(listLi);
    this.listElement.classList.add("module_list");
    this.input.value = "";
    console.log(removeSpan);

    removeSpan.addEventListener("click", this.deleteList.bind(this));
    editSpan.addEventListener("click", this.getEditList.bind(this));
    checkBox.addEventListener("click", this.checkList.bind(this));
    this.getDeleteAllIcon();
  }
  handleToDoInput(event) {
    event.preventDefault();
    this.warning.classList.add("hidden");
    if (this.input.value === "") {
      this.warning.innerText = "FILL IN THE BLANK";
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

//keydown?
