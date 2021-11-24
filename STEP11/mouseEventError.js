const list = document.querySelector(".list");
const listContent = document.querySelector(".list-content");
const listChild = listContent.querySelectorAll("li");
const resultArr = [];

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

const childMousemoveHandler = (event) => {
  const resultText = event.target.innerHTML;
  const resultContent = document.querySelector(".result-content");
  const resultChild = resultContent.querySelectorAll("li");
  resultChild.forEach((e) => {
    console.log(e.innerText.replace(/[n\:\n\0-9]/g, ""));
    resultArr.push(e.innerText.replace(/[n\:\n\0-9]/g, ""));
  });
  console.log(resultArr);

  if (resultArr.indexOf(resultText) === -1) {
    const appendedList = document.createElement("li");
    appendedList.innerText = `${resultText} : 1`;
    resultContent.appendChild(appendedList);
  } else {
    resultChild.forEach((e) => {
      if (e.innerText.replace(/[n\:\n\0-9]/g, "") === resultText) {
        e.innerText = `${resultText} : ${
          Number(e.innerText.replace(/[^0-9]/g), "") + 1
        }`;
      }
    });
  }
};

list.addEventListener("mouseenter", mouseenterHandler);
listChild.forEach((e) =>
  e.addEventListener("mousemove", childMousemoveHandler)
);
