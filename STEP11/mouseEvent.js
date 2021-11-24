const list = document.querySelector(".list");
const listContent = document.querySelector(".list-content");
const listChild = listContent.querySelectorAll("li");
const result = document.querySelector(".result");
const resultArr = [];

const showContent = () => {
  listContent.classList.remove("hidden");
};

const drawResultList = () => {
  resultLists = result.querySelector("ul");
  if (resultLists) {
    resultLists.remove();
  }
  const appendedLists = document.createElement("ul");
  resultArr.forEach((e) => {
    const appendedPart = document.createElement("li");
    appendedPart.innerHTML = `${Object.keys(e)} : ${Object.values(e)}`;
    appendedLists.appendChild(appendedPart);
  });
  result.appendChild(appendedLists);
};

const mouseenterHandler = () => {
  const startTimer = setTimeout(showContent, 1000);
  const mouseleaveHandler = () => {
    clearTimeout(startTimer);
  };
  list.addEventListener("mouseleave", mouseleaveHandler);
};

const listMousemoveHandler = (event) => {
  const target = event.target;
  target.removeEventListener("mousemove", listMousemoveHandler);
  const addEventTimer = () => {
    target.addEventListener("mousemove", listMousemoveHandler);
  };
  setTimeout(addEventTimer, 500);

  const resultText = target.innerHTML;
  const filterArr = resultArr.filter((e) => e[resultText] !== undefined);
  if (filterArr.length === 0) {
    resultArr.push({ [resultText]: 1 });
  } else {
    resultArr.forEach((e) => {
      if (typeof e[resultText] === "number") {
        e[resultText] = e[resultText] + 1;
      }
    });
  }
  drawResultList();
};

list.addEventListener("mouseenter", mouseenterHandler);
listChild.forEach((e) => e.addEventListener("mousemove", listMousemoveHandler));
