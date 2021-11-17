const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const deleteToDo = function (event) {
  console.log(event.target);
  const targetLi =
    event.target.parentElement.parentElement.parentElement.parentElement;
  targetLi.remove();
};

const checkToDo = function (event) {
  const targetBox = event.target.parentElement.parentElement;
  targetBox.classList.toggle("delete");
};

const makeToDo = function () {
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

  removeBtn.addEventListener("click", deleteToDo);
  checkBox.addEventListener("click", checkToDo);
};

const handleToDoInput = function (event) {
  event.preventDefault();
  makeToDo();
};

document.addEventListener("submit", handleToDoInput);
