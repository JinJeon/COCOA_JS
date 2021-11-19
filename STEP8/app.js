class handleToDo {
  constructor(value) {
    this.value = value;
    this.form = `${value}-form`;
    this.list = `${value}-list`;
    this.formElement = document.getElementById(`${this.form}`);
    this.listElement = document.getElementById(`${this.list}`);
    this.input = this.formElement.querySelector("input");
  }
  deleteToDo(event) {
    const targetLi =
      event.target.parentElement.parentElement.parentElement.parentElement;
    targetLi.remove();
  }

  checkToDo(event) {
    const targetBox = event.target.parentElement.parentElement;
    targetBox.classList.toggle("delete");
  }

  makeToDo() {
    const toDoValue = this.input.value;
    const listLi = document.createElement("li");
    listLi.innerText = toDoValue;
    const listSpan = document.createElement("span");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';

    listSpan.appendChild(checkBox);
    listSpan.appendChild(removeBtn);
    listLi.appendChild(listSpan);
    this.listElement.appendChild(listLi);
    this.listElement.classList.add(`${this.value}_list`);
    this.input.value = "";

    removeBtn.addEventListener("click", this.deleteToDo);
    checkBox.addEventListener("click", this.checkToDo);
  }
  makeClass(id, element) {
    id.classList.toggle(element);
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
    this.makeToDo();
  }
}
const toDos = new handleToDo("todo");
const toHaves = new handleToDo("have");
toDos.formElement.addEventListener("submit", toDos.handleToDoInput.bind(toDos));
toHaves.formElement.addEventListener(
  "submit",
  toHaves.handleToDoInput.bind(toHaves)
);
// document.addEventListener("emptied", () => console.log(1));
