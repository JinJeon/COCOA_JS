class handleList {
  constructor(value) {
    this.value = value;
    this.form = `${value}-form`;
    this.list = `${value}-list`;
    this.formElement = document.getElementById(`${this.form}`);
    this.listElement = document.getElementById(`${this.list}`);
    this.input = this.formElement.querySelector("input");
  }
  deleteList(event) {
    const targetLi = event.target.closest("li");
    targetLi.remove();
    if (this.listElement.querySelector("li") === null) {
      this.listElement.classList.remove(`${this.value}_list`);
    }
  }

  checkList(event) {
    const targetBox = event.target.parentElement.parentElement;
    targetBox.classList.toggle("delete");
  }

  makeList() {
    const toDoValue = this.input.value;
    const listLi = document.createElement("li");
    const listSpan = document.createElement("span");
    const listTrashSpan = document.createElement("span");
    const checkBox = document.createElement("input");
    const removeBtn = document.createElement("i");
    listSpan.innerText = toDoValue;
    checkBox.setAttribute("type", "checkbox");
    removeBtn.setAttribute("class", "fas fa-trash");

    // listLi.innerHTML = '<i class="fas fa-trash"></i>';
    listTrashSpan.appendChild(removeBtn);
    listLi.appendChild(listTrashSpan);
    listLi.appendChild(listSpan);
    listLi.appendChild(checkBox);
    this.listElement.appendChild(listLi);
    this.listElement.classList.add(`${this.value}_list`);
    this.input.value = "";
    listTrashSpan.addEventListener("click", this.deleteList.bind(this));
    checkBox.addEventListener("click", this.checkList.bind(this));
  }
  handleToDoInput(event) {
    warning.classList.add("hidden");
    // warning.classList.remove("fadeout");
    event.preventDefault();
    if (this.input.value === "") {
      const warning = document.getElementById("warning");
      warning.classList.remove("hidden");
      // warning.classList.add("fadeout");
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
