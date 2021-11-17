const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");

const handleToDoInput = function (event) {
  event.preventDefault();
  console.log("HI");
};

document.addEventListener("submit", handleToDoInput);
