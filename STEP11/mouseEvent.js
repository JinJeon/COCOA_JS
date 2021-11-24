const list = document.querySelector(".list");
const listContent = document.querySelector(".list-content");
const showContent = () => {
  listContent.classList.remove("hidden");
};

const mouseenterHandler = () => {
  const startTimer = setTimeout(showContent, 1000);
  const mouseleaveHandler = () => {
    clearTimeout(startTimer);
  };
  list.addEventListener("mouseleave", mouseleaveHandler);
};
list.addEventListener("mouseenter", mouseenterHandler);
