const selector = {
  list: document.querySelector(".list"),
  listContent: document.querySelector(".list-content"),
  result: document.querySelector(".result"),
};
const resultArr = [];

const showContent = () => {
  selector.listContent.classList.remove("hidden");
};

const mouseleaveHandler = () => {
  selector.listContent.classList.add("hidden");
};

const drawResultList = () => {
  resultLists = selector.result.querySelector("ul");
  if (resultLists) {
    resultLists.remove();
  }
  const appendedLists = document.createElement("ul");
  resultArr.forEach((e) => {
    const appendedPart = document.createElement("li");
    appendedPart.innerHTML = `${Object.keys(e)} : ${Object.values(e)}`;
    appendedLists.appendChild(appendedPart);
  });
  selector.result.appendChild(appendedLists);
};

const mouseenterHandler = () => {
  const startTimer = setTimeout(showContent, 1000);
  const leaveHandler = () => {
    clearTimeout(startTimer);
  };
  selector.list.addEventListener("mouseleave", leaveHandler);
};

const listMousemoveHandler = (event) => {
  const target = event.target;
  target.removeEventListener("mousemove", listMousemoveHandler);
  const addEventTimer = () => {
    target.addEventListener("mousemove", listMousemoveHandler);
  };
  setTimeout(addEventTimer, 2000);

  const resultText = target.innerHTML;
  const filterArr = resultArr.filter((e) => typeof e[resultText] === "number");
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

selector.list.addEventListener("mouseenter", mouseenterHandler);
selector.list.addEventListener("mouseleave", mouseleaveHandler);
selector.listContent
  .querySelectorAll("li")
  .forEach((el) => el.addEventListener("mousemove", listMousemoveHandler));
