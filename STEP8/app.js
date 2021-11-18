class handleToDo {
  constructor(form, list) {
    this.form = document.getElementById(`${form}`);
    this.list = document.getElementById(`${list}`);
    this.input = this.form.querySelector("input");
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
    this.list.appendChild(listLi);
    this.list.classList.add("todo_list");
    this.input.value = "";

    removeBtn.addEventListener("click", this.deleteToDo);
    checkBox.addEventListener("click", this.checkToDo);
  }

  handleToDoInput(event) {
    event.preventDefault();
    this.makeToDo();
  }
}
const newToDo = new handleToDo("todo-form", "todo-list");
document.addEventListener("submit", newToDo.handleToDoInput.bind(newToDo));
