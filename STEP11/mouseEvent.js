const list = document.querySelector(".list");
const listContent = document.querySelector(".list-content");
const showContent = () => {
  listContent.classList.remove("hidden");
};
const mouseenterHandler = () => {
  setTimeout(showContent, 1000);
};
list.addEventListener("mouseenter", mouseenterHandler);
