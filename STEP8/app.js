const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = toDoForm.querySelector("input");

class handleToDo {
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
    const toDoValue = toDoInput.value;
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
    toDoList.appendChild(listLi);
    toDoList.classList.add("todo_list");

    removeBtn.addEventListener("click", this.deleteToDo);
    checkBox.addEventListener("click", this.checkToDo);
  }

  handleToDoInput(event) {
    event.preventDefault();
    console.log(this);
    this.makeToDo();
  }
}
const newToDo = new handleToDo();
document.addEventListener("submit", newToDo.handleToDoInput.bind(newToDo));
console.log(this);
