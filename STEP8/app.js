const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const deleteToDo = function (event) {
  const targetLi = event.target.parentElement.parentElement;
  targetLi.remove();
};

const checkToDo = function (event) {
  const targetBox = event.target.parentElement.parentElement;
  console.log(event);
  console.log(targetBox);
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

  listSpan.appendChild(checkBox);
  listSpan.appendChild(removeBtn);
  listLi.appendChild(listSpan);
  toDoList.appendChild(listLi);

  removeBtn.addEventListener("click", deleteToDo);
  checkBox.addEventListener("click", checkToDo);
};

const handleToDoInput = function (event) {
  event.preventDefault();
  makeToDo();
};

document.addEventListener("submit", handleToDoInput);
